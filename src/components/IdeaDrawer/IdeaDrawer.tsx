import React from 'react'
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
  FormHelperText
} from '@chakra-ui/react'

import { useForm } from 'react-hook-form'
import { IdeaDrawerProps } from './IdeaDrawerTypes'

function IdeaDrawer({ update, data }: IdeaDrawerProps) {
  const { register, handleSubmit, watch, errors } = useForm()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()
  const onSubmit = (data: any) => {
    console.log(data)
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
            <DrawerHeader>Create your account</DrawerHeader>
            <form noValidate onSubmit={handleSubmit(onSubmit)}>
              <DrawerBody>
                <Box>
                  <Box mt='5' mb='5'>
                    <FormLabel>Name the idea</FormLabel>
                    <Input
                      isInvalid={errors.name ? true : false}
                      name='name'
                      ref={register({ required: true })}
                      size='lg'
                      type='text'
                    />
                  </Box>
                  <Box mt='5' mb='5'>
                    <FormLabel>Publish your first idea</FormLabel>
                    <Textarea
                      name='summary'
                      ref={register({ required: true })}
                      size='lg'
                      rows={5}
                      placeholder='Write your new idea here'
                    />
                  </Box>
                  <Box mt='5' mb='5'>
                    <Select
                      name='category'
                      ref={register({ required: true })}
                      size='lg'
                      placeholder='Select category'
                    >
                      <option value='Startup'>Startup</option>
                      <option value='Business'>Business</option>
                      <option value='Discussion'>Discussion</option>
                    </Select>
                  </Box>
                  <Box mt='5' mb='5'>
                    <FormLabel> დაამატე საკვანძო სიტყვები </FormLabel>
                    <Textarea
                      name='keywords'
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
                  isLoading={false}
                  loadingText='Submitting'
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
