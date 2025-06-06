from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from dotenv import load_dotenv
import requests
from lyricsgenius import Genius
import json
from openai import OpenAI
import json
import firebase_admin
from firebase_admin import credentials, firestore

load_dotenv()
app = Flask(__name__)
CORS(app)

OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')
client = OpenAI(api_key=OPENAI_API_KEY)
cred = credentials.Certificate('firebase-key.json')
firebase_admin.initialize_app(cred)
db = firestore.client()
words_collection = db.collection("words")

GENIUS_API_TOKEN = os.getenv('GENIUS_ACCESS_TOKEN')
headers = { "Authorization": f"Bearer {GENIUS_API_TOKEN}" }
genius = Genius(GENIUS_API_TOKEN)

def get_song_data(song):
    params = { "q": song }
    response = requests.get("https://api.genius.com/search", headers=headers, params=params)
    data = response.json()
    all_songs = data["response"]["hits"]
    
    num_top_songs = 3
    top_from_search = [] # Complete Genius JSON info of top songs from search
    for i in range(min(len(all_songs), num_top_songs)):
        top_from_search.append(all_songs[i])

    if not top_from_search:
        return None # Search resulted in no songs

    # Contains more specific info about top 3 songs from search
    top_info = []
    for song in top_from_search:
        song = song["result"]

        # Get featured artists
        featured_artists = []
        for artist in song["featured_artists"]:
            featured_artists.append(artist["name"])

        # Set info
        info = {
            "found": True,
            "title": song["title"],
            "artist": song["primary_artist"]["name"],
            "featured": featured_artists,
            "cover_img_url": song["header_image_url"],
            "lyrics_url": song["url"]
        }

        top_info.append(info)

    return top_info

@app.route('/api/fetch-lyrics', methods=['POST'])
def fetch_lyrics():
    song_info = request.get_json()["input"] # song_info = { "title": title, "artist": artist, etc }
    song = genius.search_song(title=song_info["title"], artist=song_info["artist"])
    lyrics_arr = song.lyrics.split("\n") # lyrics_arr = ["(line 1)", "(line 2)", etc]

    lyrics_arr.pop(0) # Get rid of contributors line
    if not lyrics_arr[0].strip():
        lyrics_arr.pop(0) # Remove extra white space in start
    if lyrics_arr[0][-1] == "]":
        lyrics_arr.pop(0) # Extra line before lyrics

    lyrics = "\n".join(lyrics_arr)

    # Clean lyrics up to individual words
    words = [] # Each word in the lyrics, preserving new line char
    for line in lyrics.split("\n"):
        line_words = line.split()
        if not line_words:
            continue # line is empty
        for i, word in enumerate(line_words):
            if i == len(line_words) - 1:
                words.append(word + "\n")
            else:
                words.append(word)

    return jsonify(lyrics=lyrics, words=words)

@app.route('/api/fetch-song', methods=['POST'])
def fetch_song():
    data = request.get_json() # data = { "input": user input from search form }
    input_text = data.get("input")
    song_info = get_song_data(input_text)

    if song_info is None:
        return jsonify([{"found": False}])
    
    return jsonify(song_info)

def translate(word_pt):
    prompt = f"""
    You are a linguistic parser specialized in Brazilian Portuguese.

    Given the word: "{word_pt}", return a JSON object with the following structure:

    {{
        {word_pt}: {{                // word_pt = the **EXACT** input text/word I gave you
            "meanings": [
                {{
                "pos": "<string>",             // e.g., "noun", "verb", "adjective"
                "infinitive": "<string|null>", // infinitive if verb, else null
                "gender": "<[string]|null>",   // ["m"], ["f"], ["m", "f"], or null
                "english": "<string>",         // **only** the english translation of this exact form
                "base": "<string|null>",       // base form *for nouns only* (e.g., "amigo" for "amigão")
                "counterpart": "<string|null>",// opposite-gender form if distinct, else null
                "usage": "<string>",           // "normal", "slang", or "formal"
                }}
            ],
            "port": "<bool>",                   // true if word exists in Portuguese
        }}
    }}

    Guidelines:
    - The "english" field must include ONLY the dictionary-style English translation of the exact form, NOT full phrases or grammatical labels like "1st person present"
    - ***Always*** check if the word is a **conjugated verb form**.
    - Include **every valid meaning** for this exact form, including interrogatives, nouns, and *verbs.*
    - "english" must reflect the meaning of the exact form, not just the base.
    - Use `null` where a field doesn’t apply.
    - For gender-neutral: "gender": ["m", "f"], "counterpart": null.
    - If not in Portuguese: "port": false, "meanings": []
    - Do **not** include explanations—return only the JSON
    """

    # check cache
    doc = words_collection.document(word_pt).get()
    if doc.exists:
        print("cache hit")
        return doc.to_dict()

    # not in cache
    print("not in cache... making request")
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}],
        response_format={"type": "json_object"}
    )

    json_data = json.loads(response.choices[0].message.content)
    word_data = json_data[word_pt]

    # save to firestore
    words_collection.document(word_pt).set(word_data)
    print("added")
    return word_data

@app.route('/api/get-translation', methods=['POST'])
def get_translation():
    word = request.get_json()["word"]
    ### translate word
    # ...
    word_info = translate(word)
    translation = word_info["meanings"][0]["english"]
    return jsonify(translation=translation)


if __name__ == '__main__':
    app.run(debug=True)