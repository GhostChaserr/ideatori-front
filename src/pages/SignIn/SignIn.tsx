import React, { useContext, useState } from 'react'
import {
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Flex,
  Box,
  Container,
  Button,
  Alert,
  AlertIcon,
  AlertTitle
} from '@chakra-ui/react'
import PasswordInput from 'components/PasswordInput'
import { useForm } from 'react-hook-form'
import { useSignIn } from 'services/user.service'
import AuthContext from 'context/AuthContex'
import { useApolloClient } from '@apollo/client'
import { MeQuery } from 'gql/user'
import { useHistory } from 'react-router-dom'
import { SignInPayload } from './SignInTypes'
import { globalHelpers } from 'helpers'

const SignIn = () => {
  const history = useHistory()
  const [errMsg, setErrMsg] = useState<string>('')
  const apolloClient = useApolloClient()
  const { setContext } = useContext(AuthContext)
  const signIn = useSignIn()
  const [loading, setLoading] = useState<boolean>(false)
  const [submitted, setSubmitted] = useState<boolean>(false)
  const { register, handleSubmit, watch, errors } = useForm()

  const onSubmit = async ({ email, password }: SignInPayload) => {
    try {
      setLoading(true)
      let response = await signIn({
        variables: {
          email,
          password
        }
      })

      localStorage.setItem('token', response.data.signIn.accessToken)
      response = await apolloClient.query({ query: MeQuery })
      setContext({ isAuthed: true, user: response.data.me })
      setLoading(false)
      history.push('/profile')
    } catch (error) {
      setLoading(false)
      const { message } = globalHelpers.formatErrors(error)
      setErrMsg(message)
      setTimeout(() => setErrMsg(''), 2000)
    }
  }

  return (
    <Container maxW='xl'>
      {errMsg && (
        <Alert status='error'>
          <AlertIcon />
          {errMsg}
        </Alert>
      )}
      <Flex flexDirection='column'>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Box mb='5' mt='5'>
            <FormControl id='email'>
              <FormLabel>Email address</FormLabel>
              <Input
                isInvalid={errors.email ? true : false}
                name='email'
                ref={register({ required: true })}
                size='lg'
                type='email'
              />
              <FormHelperText>We'll never share your email.</FormHelperText>
            </FormControl>
          </Box>
          <Box mb='5' mt='5'>
            <FormLabel> Password </FormLabel>
            <PasswordInput
              isInvalid={errors.email ? true : false}
              ref={register({ required: true })}
              name='password'
            />
          </Box>
          <Box
            d='flex'
            flexDirection='row'
            justifyContent='flex-end'
            borderColor='red'
            mb='5'
            mt='8'
          >
            <Button
              type='submit'
              p='5'
              width='200px'
              isLoading={loading}
              loadingText='Submitting'
              colorScheme='teal'
              variant='outline'
            >
              Signin
            </Button>
          </Box>
        </form>
      </Flex>
    </Container>
  )
}

export default SignIn
