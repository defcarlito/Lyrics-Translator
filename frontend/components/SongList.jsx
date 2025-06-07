
import SongDisplay from "./SongDisplay";

function SongList({ receivedData, setLyricWords, setLoadingLyrics }) {

    if (receivedData.length === 1 && receivedData[0].found === false) {
        return <div>No songs found.</div> // receivedData = [{"found": false}]
    }

    if (receivedData.length === 0) return null; // Hides styles if search is empty

    return (
        <>
            <div
                style={{
                    display: 'flex',
                    gap: '5%',
                    background: 'lightgrey',
                    padding: '20px',
                    borderRadius: '30px'
                }}
            >
                {receivedData.map((entry, index) => (
                    <SongDisplay 
                    key={index} 
                    receivedData={entry} 
                    setLyricWords={setLyricWords}
                    setLoadingLyrics={setLoadingLyrics} 
                    />
                ))}
            </div>
        </>
    );
}

export default SongList