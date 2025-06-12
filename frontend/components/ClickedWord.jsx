import { useEffect, useState } from 'react'
import { Box, Button, Heading, Text, VStack, Center, Tag, HStack, Link, Spinner, Tooltip } from '@chakra-ui/react'
import { CloseIcon } from '@chakra-ui/icons'

function ClickedWord({ word, clickedWords, setClickedWords }) {

    const [isPort, setIsPort] = useState(true) // is the word portuguese?
    const [wordMeanings, setWordMeanings] = useState([]) // all the word's meanings info for each meaning
    const [loadingWord, setLoadingWord] = useState(false)

    useEffect(() =>{
        setLoadingWord(true)
        fetch('http://localhost:5000/api/get-translation', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ word: word })
            })
            .then(result => result.json())
            .then(data => {
                setIsPort(data.port)
                setWordMeanings(data.meanings)
                setLoadingWord(false)
                    
            })
    }, [word])

    function getGenderColor(genderArray) {
        if (!genderArray || genderArray.length === 0) return "gray"
        if (genderArray.length === 2) return "purple"
        return genderArray[0] === "m" ? "blue" : "pink"
    }

    function removeWord(){
        let newArr = [...clickedWords]
        newArr.splice(clickedWords.indexOf(word), 1)
        setClickedWords(newArr)
    }

    return (
        <Box 
        position="relative"
        bg="gray.300"
        borderRadius="30px"
        border="1.5px solid"
        borderColor="gray.500"
        py={5}
        px={10}
        maxW="100%"
        wordBreak="break-word"
        >   
            {!loadingWord ? (
                <>
                    {isPort ? (
                        <Center display="flex" flexDirection="column" gap={2}>
                            <Heading size="sm">{word}</Heading>
                            {wordMeanings.map((meaning) => {
                                return (
                                        <VStack>
                                            <Text>"{meaning.english}"</Text>
                                            {meaning.pos === "verb" && (
                                                <Tooltip label={`See verb conjugations for "${meaning.infinitive}"`}>    
                                                    <Link 
                                                    href={`https://conjugator.reverso.net/conjugation-portuguese-verb-${meaning.infinitive}.html`}
                                                    isExternal
                                                    color="blue.500"
                                                    >
                                                        <Text>({meaning.infinitive})</Text>
                                                    </Link>
                                                </Tooltip>
                                                )}
                                            <HStack>
                                                <Tag>{meaning.pos}</Tag>
                                                {meaning.gender && (
                                                    <Tag colorScheme={getGenderColor(meaning.gender)}>
                                                        {meaning.gender.length === 2 ? ("m & f") : meaning.gender[0]}
                                                    </Tag>
                                                )}
                                                {meaning.usage === "slang" && (<Tag colorScheme="orange">slang</Tag>)}
                                            </HStack>
                                        </VStack>
                                )
                            })}
                        </Center>
                ) : (
                    <Center display="flex" flexDirection="column" gap={2}>
                        <Heading size="sm">{word}</Heading>
                        <Tag size="md" colorScheme="red">Not Portuguese!</Tag>
                    </Center>
                )}
                </>
            ) : (
                <Spinner color="grey.300" size="lg"/>
            )}
            <Button 
            position="absolute"
            top={-2}
            right={-2}
            size="sm"
            borderRadius="full"
            onClick={removeWord} 
            colorScheme="red"
            >
                <CloseIcon></CloseIcon>
            </Button>
        </Box>
    )
}

export default ClickedWord