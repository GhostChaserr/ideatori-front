import {
  InputGroup,
  Input,
  InputRightElement,
  Button,
  FormLabel
} from '@chakra-ui/react'
import React from 'react'

const PasswordInput = React.forwardRef((props: any, ref: any) => {
  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)
  return (
    <InputGroup size='lg'>
      <Input
        isInvalid={props.isInvalid}
        ref={ref}
        name={props.name}
        pr='4.5rem'
        type={show ? 'text' : 'password'}
        placeholder='Enter password'
        size='lg'
      />
      <InputRightElement width='4.5rem'>
        <Button h='1.75rem' size='sm' onClick={handleClick}>
          {show ? 'Hide' : 'Show'}
        </Button>
      </InputRightElement>
    </InputGroup>
  )
})

export default PasswordInput
