import { useMutation } from '@apollo/client'
import { SignInMutation, SignUpMutation } from 'gql/user'

export const useSignUp = () => useMutation(SignUpMutation)[0]
export const useSignIn = () => useMutation(SignInMutation)[0]