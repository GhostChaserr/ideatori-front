import { useMutation } from '@apollo/client'
import { CreateCommentMutation } from 'gql/comment'

export const useCreateComment = () => useMutation(CreateCommentMutation)[0]
