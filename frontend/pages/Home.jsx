import SongList from '../components/SongList'
import InputSection from '/components/Input.jsx'
import Lyrics from '/components/Lyrics.jsx'
import ClickedWord from '/components/ClickedWord'
import { useState } from 'react'
import '/pages/Home.css'
import { Box, Divider, Heading, HStack, VStack, Text, Flex } from '@chakra-ui/react'

function Home() {
    const [loadingSongs, setLoadingSongs] = useState(false)
    const [loadingLyrics, setLoadingLyrics] = useState(false)

    const [receivedData, setReceivedData] = useState('')
    const [lyricWords, setLyricWords] = useState([])
    const [clickedWords, setClickedWords] = useState([])

    return (
        <Box bg="gray.300" minH="100vh" w="100%" p={10}>
            <VStack spacing={10}>
                <Heading 
                size="3xl"
                >
                    Lyrics Translator
                </Heading>
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
                        <Text>Searching for your song...</Text>
                    ) : (
                        <SongList 
                        receivedData={receivedData}
                        setLyricWords={setLyricWords} 
                        setLoadingLyrics={setLoadingLyrics}
                        />
                    )}
                </Box>
                <Divider my={4} borderColor="gray.400"/>
                <Flex className="lyrics-clickedwords" direction="column" gap={10}>
                    <Heading >Lyrics</Heading>
                    <HStack w="100%" justify="space-between" align="start" flex={1} gap={50}>
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
                </Flex>
            </VStack>
        </Box>
        
    )
}

export default Home