import SongList from '../components/SongList'
import Input from '/components/Input.jsx'
import Lyrics from '/components/Lyrics.jsx'
import ClickedWord from '/components/ClickedWord'
import { useState } from 'react'
import '/pages/Home.css'

function Home() {
    const [loadingSongs, setLoadingSongs] = useState(false)
    const [loadingLyrics, setLoadingLyrics] = useState(false)

    const [receivedData, setReceivedData] = useState('')
    const [lyricWords, setLyricWords] = useState([])
    const [clickedWords, setClickedWords] = useState([])

    return (
        <div>
            <div className="input-container">
                <Input
                 setReceivedData={setReceivedData}
                 setLoadingSongs={setLoadingSongs}
                 setLyricWords={setLyricWords}
                 setClickedWords={setClickedWords}
                />
            </div>
            <div className="display-container">
                {loadingSongs ? (
                    <p>Searching for your song...</p>
                ) : (
                    <SongList 
                    receivedData={receivedData}
                    setLyricWords={setLyricWords} 
                    setLoadingLyrics={setLoadingLyrics}
                    />
                )}
            </div>
            <div className='lyrics-clicked-container'>
                <div>
                    <Lyrics
                    words={lyricWords}
                    clickedWords={clickedWords}
                    setClickedWords={setClickedWords}
                    loadingLyrics={loadingLyrics}
                    />
                </div>
                <div className='clicked-words-container'>
                    {lyricWords.length === 0 ? (
                        <></>
                    ) : (
                        <>
                            {clickedWords.map((word, index) => (
                            <ClickedWord word={word} index={index}/>
                            ))}
                            <button onClick={() => setClickedWords([])}>clear</button>
                        </>
                    )}   
                </div>
            </div>
        </div>
        
    )
}

export default Home