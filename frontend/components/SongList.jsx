
import { VStack, Text, Flex } from "@chakra-ui/react";
import SongDisplay from "./SongDisplay";

function SongList({ receivedData, setLyricWords, setLoadingLyrics, setSongSelected, setChosenSong }) {

    if (receivedData.length === 1 && receivedData[0].found === false) {
        return <div>No songs found.</div> // receivedData = [{"found": false}]
    }

    if (receivedData.length === 0) return null; // Hides styles if search is empty

    return (
        <Flex direction="column" alignItems="center" gap={3} w="100%">
            <VStack 
            spacing={5}
            bg="gray.400"
            p={[6, 12]}
            borderRadius="30px"
            boxShadow="lg"
            align="stretch"
            w="100%"
            maxW="700px"
            >
                {receivedData.map((entry) => (
                    <SongDisplay 
                    receivedData={entry} 
                    setLyricWords={setLyricWords}
                    setLoadingLyrics={setLoadingLyrics} 
                    setSongSelected={setSongSelected}
                    setChosenSong={setChosenSong}
                    />
                ))}
            </VStack>
            <Text color="gray.600">Click on a song to get its lyrics</Text>
        </Flex>
    );
}

export default SongList