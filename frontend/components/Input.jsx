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
        <> 
            <h1>Search for a song</h1>
            <input onChange={event => setUserSearch(event.target.value)} />
            <button onClick={search}>search</button>
            <button onClick={clear}>clear</button>
        </>
    )
}

export default Input