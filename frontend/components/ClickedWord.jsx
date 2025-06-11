import { useEffect, useState } from 'react'
import { Box, Button, Heading, Text, VStack, Center, Tag, HStack, Link } from '@chakra-ui/react'

function ClickedWord({ word, index, clickedWords, setClickedWords }) {

    const [isPort, setIsPort] = useState(true) // is the word portuguese?
    const [wordMeanings, setWordMeanings] = useState([]) // all the word's meanings info for each meaning

    useEffect(() =>{
        fetch('http://localhost:5000/api/get-translation', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ word: word })
            })
            .then(result => result.json())
            .then(data => {
                setIsPort(data.port)
                setWordMeanings(data.meanings)
                    
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
        className={index}
        bg="gray.300"
        borderRadius="30px"
        border="1.5px solid"
        borderColor="gray.500"
        py={5}
        px={20}
        >   
            {isPort ? (
                <Center display="flex" flexDirection="column" gap={2}>
                    <Heading size="sm">{word}</Heading>
                    {wordMeanings.map((meaning) => {
                        return (
                            <>
                                <VStack>
                                    <Text>"{meaning.english}"</Text>
                                    {meaning.pos === "verb" && (
                                        <Link 
                                        href={`https://conjugator.reverso.net/conjugation-portuguese-verb-${meaning.infinitive}.html`}
                                        isExternal
                                        color="blue.500"
                                        >
                                            <Text>({meaning.infinitive})</Text>
                                        </Link>
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
                            </>
                        )
                    })}
                </Center>
            ) : (
                <Center display="flex" flexDirection="column" gap={2}>
                    <Heading size="sm">{word}</Heading>
                    <Tag size="md" colorScheme="red">Not Portuguese!</Tag>
                </Center>
            )}
            <Button 
            position="absolute"
            top={4}
            right={4}
            size="sm"
            onClick={removeWord} 
            colorScheme="red"
            >
                x
            </Button>
        </Box>
    )
}

export default ClickedWord