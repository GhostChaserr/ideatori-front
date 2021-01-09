import { Box, Button, FormLabel, Textarea } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useCreateComment } from 'services/comment.service'
import { CommentInputProps } from './CommentInputTypes'

const CommentsInput = ({ service, serviceId }: CommentInputProps) => {
  const [loading, setLoading] = useState(false)
  const createComment = useCreateComment()
  const { register, handleSubmit, watch, errors } = useForm()
  const onSubmit = async ({ text }: { text: string }) => {
    try {
      setLoading(true)
      await createComment({
        variables: {
          input: {
            text,
            service,
            serviceId,
          }
        }
      })
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }
  return (
    <>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <Box mt='5'>
          <FormLabel> დაწერე კომენტარი </FormLabel>
          <Textarea
            name='text'
            ref={register({ required: true })}
            size='md'
            rows={3}
          />
        </Box>
        <Box>
          <Button
            size='md'
            type='submit'
            p='5'
            isLoading={loading}
            loadingText='Wait...'
            colorScheme='teal'
            variant='outline'
          >
            Save
          </Button>
        </Box>
      </form>
    </>
  )
}

export default CommentsInput
