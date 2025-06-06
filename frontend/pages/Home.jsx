import SongList from '../components/SongList'
import Input from '/components/Input.jsx'
import { useState } from 'react'

function Home() {
    const [receivedData, setReceivedData] = useState('')
    const [loadingSongs, setLoadingSongs] = useState(false)
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
                <SongList 
                receivedData={receivedData}
                setLyricWords={setLyricWords} 
                />
            </div>
        </div>
    )
}

export default Home