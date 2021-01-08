import { loader } from 'graphql.macro'

export const SignInMutation = loader('./signin.graphql')
export const SignUpMutation = loader('./signUp.graphql')
export const MeQuery = loader('./meQuery.graphql')
