import { Heading, VStack, Box } from "@chakra-ui/react";

import LyricWord from "./LyricWord";

function Lyrics({ words, clickedWords, setClickedWords, loadingLyrics }) {

    return (
        <>     
            {loadingLyrics ? (
                <p>Getting the lyrics...</p>
            ) : ( 
                <VStack spacing={10}>
                    <Heading>Lyrics</Heading>
                    <Box
                    bg="gray.400"
                    minWidth="100%"
                    p={5}
                    borderRadius="30px"
                    border="1.5px solid"
                    borderColor="gray.500"
                    >
                        {words.map((word, index) => (
                            <LyricWord 
                            key={index} 
                            word={word}
                            setClickedWords={setClickedWords}
                            clickedWords={clickedWords}
                            />
                        ))}
                    </Box>
                </VStack>
            )}
        </>
    );
}

export default Lyrics