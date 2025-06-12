import { Heading, VStack, Box, Flex, Text } from "@chakra-ui/react";

import LyricWord from "./LyricWord";

function Lyrics({ words, clickedWords, setClickedWords, loadingLyrics }) {

    return (
        <>     
            {loadingLyrics ? (
                <Flex h="300px" w="100%" align="center" justify="center">
                    <Spinner color="grey.300" size="lg"/>
                    <Text fontSize="l">Getting the lyrics...</Text>
                </Flex>
            ) : ( 
                <VStack spacing={6}>
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