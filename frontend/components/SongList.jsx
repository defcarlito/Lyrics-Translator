
import { Box, VStack } from "@chakra-ui/react";
import SongDisplay from "./SongDisplay";

function SongList({ receivedData, setLyricWords, setLoadingLyrics }) {

    if (receivedData.length === 1 && receivedData[0].found === false) {
        return <div>No songs found.</div> // receivedData = [{"found": false}]
    }

    if (receivedData.length === 0) return null; // Hides styles if search is empty

    return (
        <>
            <VStack 
            spacing={5}
            bg="gray.300"
            p={8}
            borderRadius="30px"
            boxShadow="lg"
            >
                {receivedData.map((entry, index) => (
                    <SongDisplay 
                    key={index} 
                    receivedData={entry} 
                    setLyricWords={setLyricWords}
                    setLoadingLyrics={setLoadingLyrics} 
                    />
                ))}
            </VStack>
        </>
    );
}

export default SongList