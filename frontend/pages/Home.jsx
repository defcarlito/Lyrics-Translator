import SongList from '../components/SongList'
import InputSection from '/components/Input.jsx'
import Lyrics from '/components/Lyrics.jsx'
import ClickedWord from '/components/ClickedWord'
import { useState } from 'react'
import '/pages/Home.css'
import { Highlight, Spacer } from '@chakra-ui/react'
import {
        Box,
        Divider,
        Heading, 
        HStack, 
        VStack, 
        Text, 
        Flex, 
        Button, 
        Image, 
        Center,
        Spinner,
        Stack
    } from '@chakra-ui/react'
import { FaGithubSquare } from 'react-icons/fa'
import { ArrowForwardIcon } from '@chakra-ui/icons'
import { Icon } from '@chakra-ui/react'
import Tutorial from '../components/Tutorial'

function Home() {
    const [loadingSongs, setLoadingSongs] = useState(false)
    const [loadingLyrics, setLoadingLyrics] = useState(false)

    const [receivedData, setReceivedData] = useState('') // all song data fetched from backend
    const [lyricWords, setLyricWords] = useState([])
    const [clickedWords, setClickedWords] = useState([])

    const [songSelected, setSongSelected] = useState(false) // true: user has picked a song, false otherwise
    const [chosenSong, setChosenSong] = useState('') // the song the user has chosen

    const [showTutorial, setShowTutorial] = useState(true)


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
                <Heading fontSize={["4xl", "5xl"]} textAlign="center">
                    Lyrics Translator
                    <Box mt={2}>
                        🇧🇷 → 🇺🇸
                    </Box>
                </Heading>
                    <Box>
                        <InputSection
                        setReceivedData={setReceivedData}
                        setLoadingSongs={setLoadingSongs}
                        setLyricWords={setLyricWords}
                        setClickedWords={setClickedWords}
                        setSongSelected={setSongSelected}
                        setShowTutorial={setShowTutorial}
                        />
                    </Box>
                {!songSelected && (
                    <>
                        <Box>
                            {loadingSongs ? (
                                <Center gap={4}>
                                    <Spinner color="grey.300" size="lg"/>
                                    <Text>Searching for your song...</Text>
                                </Center>
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

                {showTutorial ? (<Tutorial/>) : (
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
                                {loadingLyrics ? (
                                <Center w="100%" h="300px" gap={4}>
                                    <Spinner color="grey.300" size="lg"/>
                                    <Text fontSize="xl">Getting the lyrics...</Text>
                                </Center>
                                ) : (
                                <Stack 
                                w="100%" 
                                align={["center", "start"]} 
                                flex={1} 
                                spacing={[10, 20]}
                                direction={["column", "row"]}
                                >
                                    <Box w={["100%", "70%"]}>
                                    <Lyrics
                                        words={lyricWords}
                                        clickedWords={clickedWords}
                                        setClickedWords={setClickedWords}
                                        loadingLyrics={loadingLyrics}
                                    />
                                    </Box>
                                    <Box w={["100%", "50%"]}>
                                    {lyricWords.length === 0 ? (
                                        <></>
                                    ) : (
                                        <>
                                        <VStack spacing={6} align="center" w="100%">
                                            <Heading>Selected Words</Heading>
                                            <>
                                                <VStack
                                                bg="gray.400"
                                                minWidth="100%"
                                                p={10}
                                                borderRadius="30px"
                                                border="1.5px solid"
                                                borderColor="gray.500"
                                                w={["100%", "fit-content"]}
                                                align="center"
                                                h="fit-content"
                                                spacing={5}
                                                >
                                                {clickedWords.length !== 0 ? (
                                                    clickedWords.map((word) => (
                                                    <ClickedWord
                                                        word={word}
                                                        clickedWords={clickedWords}
                                                        setClickedWords={setClickedWords}
                                                    />
                                                    ))
                                                ) : (
                                                    <Box>
                                                        <Text>Click words from the lyrics!</Text>
                                                    </Box>
                                                )}
                                                </VStack>
                                                {clickedWords.length !==0 && (
                                                    <Button onClick={() => setClickedWords([])} colorScheme="red" variant="outline">Clear</Button>)
                                                    }
                                            </>
                                        </VStack>
                                        </>
                                    )}
                                    </Box>
                                </Stack>
                                )}
                            </>
                        )}
                    </Flex>
                )}

            </VStack>
            <Divider my={8} border="1px solid" borderColor="gray.400"/>
            <Icon as={FaGithubSquare} boxSize={7} color="gray.500" />
        </Box>
        
    )
}

export default Home