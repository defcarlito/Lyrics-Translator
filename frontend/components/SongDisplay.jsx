
function SongDisplay({ key, receivedData, setLyricWords }) {

    function choose() {
        console.log("chosen")
    }

    return (
        <div className={key}>
            <p>title artist</p>
            <button onClick={choose()}>choose</button>
            <img src="" alt="album cover" />
        </div>
    )
}

export default SongDisplay