import { Container, Text, Box } from '@chakra-ui/react'
import { IdeaProps } from './IdeaTypes'


const Idea = ({ idea }: IdeaProps) => {
  return (
    <Container>
      <Box>
        <Text fontSize='2xl'>{idea.name}</Text>
      </Box>
    </Container>
  )
}

export default Idea