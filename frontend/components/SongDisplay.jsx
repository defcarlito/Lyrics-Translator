import { Button, Heading, HStack, Image, Flex } from "@chakra-ui/react"


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
        <HStack spacing={4}>
            <Flex direction="column">
                <Heading size="md">{receivedData.title}</Heading>
                <Heading size="sm">{receivedData.artist}</Heading>
                <Image
                src={receivedData.cover_img_url}
                alt="album cover"
                height="150px"
                width="150px"
                />
                <Button onClick={choose}>Choose</Button>
            </Flex>
        </HStack>
    )
}

export default SongDisplay