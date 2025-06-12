import { Heading, Text, Card } from "@chakra-ui/react"

function Tutorial(){
    return (
        <Card py={6} px={10} bg="gray.400" gap={4} boxShadow="0px 2px 10px rgba(0, 0, 0, 0.3)">  
            <Heading align="center">Learn Portuguese!</Heading>
            <Text>
                Look up a song in Portuguese, then explore its lyrics.
            </Text>
        </Card>
    )
}

export default Tutorial