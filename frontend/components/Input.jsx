import { Input, HStack,  Box, InputGroup, InputLeftElement, InputRightElement } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons'
import { useState, useEffect } from 'react'
import { FiCornerDownLeft } from 'react-icons/fi'; // or any other icon you like

function InputSection({ setReceivedData, setLoadingSongs, setLyricWords, setClickedWords, setSongSelected }) {
    const [userSearch, setUserSearch] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('')

    useEffect(() => {
        const timer = setTimeout(() => {
            setSongSelected(false)
            setDebouncedSearch(userSearch.trim())
        }, 400)
        return () => clearTimeout(timer)
    }, [userSearch])

    useEffect(() =>  {
        if (!debouncedSearch) return; // don't allow empty searches
        clear()
        setLoadingSongs(true);
        fetch('http://localhost:5000/api/fetch-song', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ input: debouncedSearch })
        })
        .then(result => result.json())
        .then(data => {
            console.log(data)
            setReceivedData(data)
            setLoadingSongs(false)
        })
    }, [debouncedSearch])

    function clear() {
        setReceivedData([])
        setLyricWords([])
        setClickedWords([])
    }

    return (
        <Box>
            <form onSubmit={(e) => {
                e.preventDefault()
                setDebouncedSearch(userSearch.trim())
            }}>
                <HStack gap={10}>
                    <InputGroup size="lg">
                        <InputLeftElement h="70px">
                            <SearchIcon></SearchIcon>
                        </InputLeftElement>
                        <Input 
                        placeholder='Search for a song...'
                        value={userSearch}
                        onChange={e => setUserSearch(e.target.value)}
                        borderRadius="full"
                        h="70px"
                        w="30vh"
                        fontSize="x5"
                        bg="gray.400"
                        border="solid 1px"
                        borderColor="gray.500"
                        boxShadow="lg"
                        focusBorderColor="gray.600"
                        />
                        <InputRightElement h="70px">
                            <FiCornerDownLeft></FiCornerDownLeft>
                        </InputRightElement>
                    </InputGroup>
                </HStack>
            </form>
        </Box>
    )
}

export default InputSection