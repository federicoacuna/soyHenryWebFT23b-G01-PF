import { HStack, Input } from '@chakra-ui/react'

export default function LabelInput ({ label, placeholder, onChange, name, value }) {
  return (
    <HStack>
      <label htmlFor={label}>{label}</label>
      <Input name={name} placeholder={placeholder} variant='flushed' onChange={onChange} value={value} />
    </HStack>
  )
}
