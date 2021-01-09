import React, { useState } from 'react'
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Textarea,
  Box,
  FormLabel,
  Button,
  useDisclosure,
  Input,
  Select,
  FormHelperText,
  Alert,
  AlertIcon
} from '@chakra-ui/react'

import { useForm } from 'react-hook-form'
import { IdeaDrawerProps, CreateIdeaPayload } from './IdeaDrawerTypes'
import { useCreateIdea } from 'services/idea.service'
import { globalHelpers } from 'helpers'

function IdeaDrawer({ update, data }: IdeaDrawerProps) {
  const [message, setMessage] = useState<{ msg: string, type: any }>({ msg:'', type:'' })
  const [loading, setLoading] = useState(false)
  const createIdea = useCreateIdea()
  const { register, handleSubmit, watch, errors } = useForm()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const onSubmit = async ({
    name,
    summary,
    category,
    keywordsString
  }: CreateIdeaPayload) => {
    try {
      setLoading(true)

      if (keywordsString.length === 0) {
        setLoading(false)
        setMessage({ msg: 'დაამატე მინიმუმ 2 საკვანძო სიტყვა!', type:'error' })
        setTimeout(() => setMessage({ msg: '', type: '' }), 2000)
        return
      }

      const keywords = globalHelpers.getKeywordsFromString(keywordsString)
      const response = await createIdea({
        variables: {
          input: {
            keywords,
            name,
            summary,
            category
          }
        }
      })
      setMessage({ msg: 'თქვენი იდეა გამოქვეყნდა', type:'success' })
      setTimeout(() => setMessage({ msg: '', type: '' }), 2000)
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }

  return (
    <>
      <Button colorScheme='teal' onClick={onOpen}>
        Write new idea
      </Button>
      <Drawer size='xl' isOpen={isOpen} placement='right' onClose={onClose}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader> მოგვიყევი შენი იდეის შესახებ </DrawerHeader>
            <form noValidate onSubmit={handleSubmit(onSubmit)}>
              <DrawerBody>
                <Box>
                  {message.msg && (
                    <Alert status={message.type}>
                      <AlertIcon />
                      {message.msg}
                    </Alert>
                  )}
                  <Box mt='5' mb='5'>
                    <FormLabel> დაარქვი იდეას სახელი </FormLabel>
                    <Input
                      isInvalid={errors.name ? true : false}
                      name='name'
                      ref={register({ required: true })}
                      size='lg'
                      type='text'
                    />
                  </Box>
                  <Box mt='5' mb='5'>
                    <FormLabel> დაწერე იდეის მოკლე აღწერა </FormLabel>
                    <Textarea
                      name='summary'
                      ref={register({ required: true })}
                      size='lg'
                      rows={5}
                      placeholder='Write your new idea here'
                    />
                  </Box>
                  <Box mt='5' mb='5'>
                    <FormLabel> აირჩიე კატეოგირა </FormLabel>
                    <Select
                      defaultValue='Discussion'
                      name='category'
                      ref={register({ required: true })}
                      size='lg'
                    >
                      <option value='Startup'>სტარტაპი</option>
                      <option value='Business'>ბიზნესი</option>
                      <option value='Discussion'>იდეა</option>
                    </Select>
                  </Box>
                  <Box mt='5' mb='5'>
                    <FormLabel> დაამატე საკვანძო სიტყვები </FormLabel>
                    <Textarea
                      name='keywordsString'
                      ref={register}
                      size='lg'
                      rows={3}
                    />
                    <FormHelperText>
                      სიტყვებს შორის დატოვე მძიმე.
                    </FormHelperText>
                  </Box>
                </Box>
              </DrawerBody>
              <DrawerFooter>
                <Button
                  size='lg'
                  type='submit'
                  p='5'
                  isLoading={loading}
                  loadingText='Wait...'
                  colorScheme='teal'
                  variant='outline'
                >
                  Publish
                </Button>
              </DrawerFooter>
            </form>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  )
}

export default IdeaDrawer
