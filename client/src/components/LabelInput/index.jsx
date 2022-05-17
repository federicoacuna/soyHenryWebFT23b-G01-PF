import { HStack, Input } from '@chakra-ui/react'

export default function LabelInput ({ label, placeholder }) {
  return (
    <HStack>
      <label htmlFor={label}>{label}</label>
      <Input name={label} placeholder={placeholder} variant='flushed' />
    </HStack>
  )
}
