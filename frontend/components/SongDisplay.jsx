import { Button, Heading, VStack, Image, Flex, Text, Box } from "@chakra-ui/react"


function SongDisplay({ receivedData, setLyricWords, setLoadingLyrics }) {

    function choose() {
        setLoadingLyrics(true)
        fetch('http://localhost:5000/api/fetch-lyrics', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ input: receivedData })
        })
        .then(result => result.json())
        .then(data => {
            setLyricWords(data.words)
            setLoadingLyrics(false)
        })
    }

    return (   
        <Box>
            <Flex
            direction="row" 
            gap={5} 
            bg="gray.300"
            minWidth="100%"
            p={5}
            borderRadius="30px"
            border="1.5px solid"
            borderColor="gray.500"
            onClick={choose}
            _hover={{ bg: "gray.200", transform: "scale(1.01)" }}
            transition="all 0.2s"
            cursor="pointer"
            >
                <Image
                src={receivedData.cover_img_url}
                alt="album cover"
                height="150px"
                width="150px"
                />
                <Flex 
                direction="column" 
                gap={3}
                >
                    <Heading size="md">{receivedData.title}</Heading>
                    <Text size="sm">{receivedData.artist}</Text>
                </Flex>
            </Flex>
        </Box>
        
        
    )
}

export default SongDisplay