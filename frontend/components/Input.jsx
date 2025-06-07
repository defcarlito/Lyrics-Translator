import { useState } from 'react'

function Input({ setReceivedData, setLoadingSongs, setLyricWords, setClickedWords }) {
    const [userSearch, setUserSearch] = useState('');

    function search() {
        if (!userSearch.trim()) return; // don't allow empty searches
        clear()
        setLoadingSongs(true);
        fetch('http://localhost:5000/api/fetch-song', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ input: userSearch })
        })
        .then(result => result.json())
        .then(data => {
            console.log(data)
            setReceivedData(data)
            setLoadingSongs(false)
        });
    }

    function clear() {
        setReceivedData([])
        setLyricWords([])
        setClickedWords([])
    }

    return (
        <div>
            <h1 variant="h3">Choose a song</h1>
            <input onChange={e => setUserSearch(e.target.value)}></input>
            <button onClick={search}>Search</button>
            <button onClick={clear}>Clear</button>
        </div>
    )
}

export default Input