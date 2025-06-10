import SongList from '../components/SongList'
import InputSection from '/components/Input.jsx'
import Lyrics from '/components/Lyrics.jsx'
import ClickedWord from '/components/ClickedWord'
import { useState } from 'react'
import '/pages/Home.css'
import { Box, Divider, Heading, HStack, VStack, Text, Flex, Button, Image } from '@chakra-ui/react'

function Home() {
    const [loadingSongs, setLoadingSongs] = useState(false)
    const [loadingLyrics, setLoadingLyrics] = useState(false)

    const [receivedData, setReceivedData] = useState('') // all song data fetched from backend
    const [lyricWords, setLyricWords] = useState([])
    const [clickedWords, setClickedWords] = useState([])

    const [songSelected, setSongSelected] = useState(false) // true: user has picked a song, false otherwise
    const [chosenSong, setChosenSong] = useState('') // the song the user has chosen


    return (
        <Box 
        bg="gray.300" 
        minH="100vh" 
        w="100%" 
        p={10} 
        display="flex" 
        flexDirection="column" 
        alignItems="center" 
        justifyContent="center">
            <VStack spacing={10} flex={1}>
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
                        setSongSelected={setSongSelected}
                        />
                    </Box>
                {!songSelected && (
                    <>
                        <Box>
                            {loadingSongs ? (
                                <Text>Searching for your song...</Text>
                            ) : (
                                <SongList 
                                receivedData={receivedData}
                                setLyricWords={setLyricWords} 
                                setLoadingLyrics={setLoadingLyrics}
                                setSongSelected={setSongSelected}
                                setChosenSong={setChosenSong}
                                />
                            )}
                        </Box>
                    </>
                )}
                <Flex className="lyrics-clickedwords" direction="column" gap={10}>
                    {songSelected && (
                        <>  
                            <Flex 
                            direction="column" 
                            align="center"
                            bg="gray.400"
                            borderRadius="30px"
                            border="1.5px solid"
                            borderColor="gray.500"
                            w="fit-content"
                            alignSelf="center"
                            >
                                <Flex 
                                direction="row" 
                                p={5} 
                                gap={5}
                                >
                                    <Image 
                                    src={chosenSong.cover_img_url}
                                    height="100px"
                                    width="100px"
                                    />
                                    <Flex direction="column">
                                        <Heading size="md">{chosenSong.title}</Heading>
                                        <Text>{chosenSong.artist}</Text>
                                    </Flex>
                                </Flex>
                            </Flex>
                            <HStack w="100%" justify="space-between" align="start" flex={1} gap={200}>
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
                                            <VStack spacing={10}>
                                                <Heading>Selected Words</Heading>
                                                {clickedWords.length != 0 && (
                                                    <>
                                                        <VStack
                                                        bg="gray.400"
                                                        minWidth="100%"
                                                        p={10}
                                                        borderRadius="30px"
                                                        border="1.5px solid"
                                                        borderColor="gray.500"
                                                        w="fit-content"
                                                        spacing={5}
                                                        >
                                                        {clickedWords.map((word, index) => (
                                                            <ClickedWord 
                                                            word={word} 
                                                            index={index}
                                                            clickedWords={clickedWords}
                                                            setClickedWords={setClickedWords}
                                                            />
                                                        ))}
                                                        </VStack>
                                                        <Button onClick={() => setClickedWords([])}>clear</Button>
                                                    </>    
                                                )}
                                            </VStack>
                                        </>
                                    )}   
                                </Box>
                            </HStack>
                        </>
                    )}
                </Flex>
            </VStack>
            <Divider my={4} border="1px solid" borderColor="gray.400"/>
            <Text>Footer content</Text>
        </Box>
        
    )
}

export default Home