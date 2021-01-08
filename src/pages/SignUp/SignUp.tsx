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
} from '@chakra-ui/react'

import PasswordInput from 'components/PasswordInput'
import { useForm } from 'react-hook-form'
import { useSignUp } from 'services/user.service'
import { useApolloClient } from '@apollo/client'
import { MeQuery } from 'gql/user'
import AuthContext from 'context/AuthContex'
import { SignUpPayload } from './SignUpTypes'
import { IAuthContext } from 'context/interface'
import { globalHelpers } from 'helpers'
import { useHistory } from 'react-router-dom'

const SignUp = () => {
  const history = useHistory()
  const [errMsg, setErrMsg] = useState<string>('')
  const { setContext } = useContext<IAuthContext>(AuthContext)
  const signUp = useSignUp()
  const apolloClient = useApolloClient()
  const [loading, setLoading] = useState<boolean>(false)
  const { register, handleSubmit, watch, errors } = useForm()

  const onSubmit = async ({
    name,
    email,
    password,
    repeatPassword,
    lastName
  }: SignUpPayload) => {
    try {
      setLoading(true)

      if (password !== repeatPassword) {
        setLoading(false)
        setErrMsg('Passwords do not match!')
        setTimeout(() => setErrMsg(''), 2000)
        return
      }

      if (password.length < 8) {
        setLoading(false)
        setErrMsg('Password length must be at least 8 characters long!')
        setTimeout(() => setErrMsg(''), 2000)
        return
      }

      let response = await signUp({
        variables: {
          name,
          lastName,
          email,
          password
        }
      })

      localStorage.setItem('token', response.data.signUp.accessToken)
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
            <FormControl id='name'>
              <FormLabel>First name</FormLabel>
              <Input
                isInvalid={errors.name ? true : false}
                name='name'
                ref={register({ required: true })}
                size='lg'
                placeholder='First name'
              />
            </FormControl>
          </Box>
          <Box mb='5' mt='5'>
            <FormControl id='lastName'>
              <FormLabel>First name</FormLabel>
              <Input
                isInvalid={errors.lastName ? true : false}
                name='lastName'
                ref={register({ required: true })}
                size='lg'
                placeholder='First name'
              />
            </FormControl>
          </Box>
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
              name='repeatPassword'
            />
          </Box>
          <Box mb='5' mt='5'>
            <FormLabel>Repeat password </FormLabel>
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
              Signup
            </Button>
          </Box>
        </form>
      </Flex>
    </Container>
  )
}

export default SignUp
