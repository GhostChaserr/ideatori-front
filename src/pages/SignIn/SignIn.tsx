import React, { useState } from 'react'
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

const SignIn = () => {
  const [submitted, setSubmitted] = useState(false)
  const { register, handleSubmit, watch, errors } = useForm()
  const onSubmit = (data: any) => setSubmitted(true)
  return (
    <Container maxW='xl'>
      {!submitted && (
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
                name='repeatPassword'
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
                isLoading={false}
                loadingText='Submitting'
                colorScheme='teal'
                variant='outline'
              >
                Signin
              </Button>
            </Box>
          </form>
        </Flex>
      )}
      {submitted && (
        <Alert
          status='success'
          variant='subtle'
          flexDirection='column'
          alignItems='center'
          justifyContent='center'
          textAlign='center'
          height='200px'
        >
          <AlertIcon boxSize='40px' mr={0} />
          <AlertTitle mt={4} mb={1} fontSize='lg'>
            Successful signIn. Redirecting to home page ..
          </AlertTitle>
        </Alert>
      )}
    </Container>
  )
}

export default SignIn