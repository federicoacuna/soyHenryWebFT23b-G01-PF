import { Button } from '@chakra-ui/react'

export default function ButtonPrimary ({ text, onclick }) {
  return (
    <Button colorScheme='blue' onClick={onclick}>{text}</Button>
  )
}
