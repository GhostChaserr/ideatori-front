import * as React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { ApolloProvider } from '@apollo/client'
import client from 'services/apollo.service'
import Router from 'Router'


function App() {
  // 2. Use at the root of your app
  return (
    <ApolloProvider client={client}>
      <ChakraProvider resetCSS={true}>
        <Router/>
      </ChakraProvider>
    </ApolloProvider>
  )
}

export default App