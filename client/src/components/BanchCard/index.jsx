// import s from './index.module.css'
import { Text, VStack, Circle, Button, Flex, useToast, RadioGroup, Radio, Stack, Box, Divider } from '@chakra-ui/react' //eslint-disable-line
import { BsShop, BsFillCheckCircleFill as CheckIcon } from 'react-icons/bs'

export default function BranchCard ({ idBranch, state, city, streetName, houseNumber, phoneNumber, id, setIdBranch }) {
  const imSelected = idBranch === id

  return (
    <Flex cursor='pointer' alignItems='flex-start' flexDirection='column' boxShadow='md' w='30rem' bg='white' borderRadius={3} mt={2} mb={2} onClick={() => setIdBranch(id)}>
      <Flex w='100%' alignItems='center' justifyContent='space-between'>
        <Flex alignItems='center'>
          <Box m={4}>
            <Circle opacity='0.5' size='40px' bg='accent' color='white'><BsShop size={20} /></Circle>
          </Box>
          <VStack pt={3} pb={3} alignItems='flex-start'>
            <Text>{`Calle ${streetName} # ${houseNumber}.`}</Text>
            <Text>{`${city}, ${state}.`}</Text>
            <Text>Tel. {`${phoneNumber}`}</Text>
          </VStack>
        </Flex>
        <Flex m={5} justifyContent='center'>
          {imSelected && <CheckIcon size={20} color='#38A169' />}
        </Flex>
      </Flex>

    </Flex>

  )
}
