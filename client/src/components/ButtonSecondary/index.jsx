import { Button } from '@chakra-ui/react'

export default function ButtonSecondary ({ text, onclick }) {
  return (
    <Button colorScheme='green' onClick={onclick}>{text}</Button>
  )
}
