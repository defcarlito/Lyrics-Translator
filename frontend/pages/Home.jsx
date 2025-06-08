import SongList from '../components/SongList'
import InputSection from '/components/Input.jsx'
import Lyrics from '/components/Lyrics.jsx'
import ClickedWord from '/components/ClickedWord'
import { useState } from 'react'
import '/pages/Home.css'
import { Box, Divider, Heading, HStack, VStack } from '@chakra-ui/react'

function Home() {
    const [loadingSongs, setLoadingSongs] = useState(false)
    const [loadingLyrics, setLoadingLyrics] = useState(false)

    const [receivedData, setReceivedData] = useState('')
    const [lyricWords, setLyricWords] = useState([])
    const [clickedWords, setClickedWords] = useState([])

    return (
        <Box bg="gray.300" minH="100vh" w="100%" p={10}>
            <VStack spacing={10}>
                <Heading>Lyrics Translator</Heading>
                <Box>
                    <InputSection
                    setReceivedData={setReceivedData}
                    setLoadingSongs={setLoadingSongs}
                    setLyricWords={setLyricWords}
                    setClickedWords={setClickedWords}
                    />
                </Box>
                <Box>
                    {loadingSongs ? (
                        <p>Searching for your song...</p>
                    ) : (
                        <SongList 
                        receivedData={receivedData}
                        setLyricWords={setLyricWords} 
                        setLoadingLyrics={setLoadingLyrics}
                        />
                    )}
                </Box>
                <Divider my={4} borderColor="gray.400"/>
                <Box>
                    <HStack>
                        <Box>
                            <Lyrics
                            words={lyricWords}
                            clickedWords={clickedWords}
                            setClickedWords={setClickedWords}
                            loadingLyrics={loadingLyrics}
                            />
                        </Box>
                        <Box>
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
                        </Box>
                    </HStack>
                </Box>
            </VStack>
        </Box>
        
    )
}

export default Home