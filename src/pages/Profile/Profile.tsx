import React from 'react'
import IdeaInput from 'components/IdeaDrawer'
import { Container } from '@chakra-ui/react'
import Idea from 'components/Idea/Idea'

const Profile = () => {
  return (
    <Container maxW='xl'>
      <div>
        <IdeaInput update={true} data={{ name: 'name' }} />
      </div>
      <div>
        <Idea
          idea={{
            name:'idea',
            summary:'idea',
            keywords:['hello']
          }}
         />
      </div>
    </Container>
  )
}

export default Profile