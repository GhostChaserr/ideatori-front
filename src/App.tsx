import React, { useState } from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { ApolloProvider } from '@apollo/client'
import client from 'services/apollo.service'
import Router from 'Router'
import AuthContext from 'context/AuthContex'
import { IAuthContext } from 'context/interface'



function App() {
  const [authContext, setContext] = useState<IAuthContext>({
    isAuthed: false,
    user: {},
    setContext: undefined
  })
  return (
    <ApolloProvider client={client}>
      <ChakraProvider resetCSS={true}>
        <AuthContext.Provider value={{ ...authContext, setContext }}>
          <Router/>
        </AuthContext.Provider>
      </ChakraProvider>
    </ApolloProvider>
  )
}

export default App