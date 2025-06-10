import { useState } from 'react'
import { Box, Button, Heading, Flex } from '@chakra-ui/react'

function ClickedWord({ word, index, clickedWords, setClickedWords }) {

    const [translation, setTranslation] = useState('')

    fetch('http://localhost:5000/api/get-translation', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ word: word })
        })
        .then(result => result.json())
        .then(data => {
            console.log(data)
            setTranslation(data.translation)
        })

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
            <Heading size="sm">{word}</Heading>
            <p>English: "{translation}"</p>
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