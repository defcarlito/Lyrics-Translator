

function SongDisplay({ receivedData, setLyricWords, setLoadingLyrics }) {

    function choose() {
        setLoadingLyrics(true)
        fetch('http://localhost:5000/api/fetch-lyrics', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ input: receivedData })
        })
        .then(result => result.json())
        .then(data => {
            setLyricWords(data.words)
            setLoadingLyrics(false)
        })
    }

    return (   
        <div>
            <p>{receivedData.title + " by " + receivedData.artist}</p>
            <img
            src={receivedData.cover_img_url}
            alt="album cover"
            style ={{
                height: '150px',
                width: '150px'
            }}
            />
            <button onClick={choose}>Choose</button>
        </div> 
    )
}

export default SongDisplay