import { Link,Text, VStack, Circle, Button, Flex, useToast, RadioGroup, Radio, Stack, Box, Divider } from '@chakra-ui/react' //eslint-disable-line
import { SiWhatsapp } from 'react-icons/si'
import { BsFillCheckCircleFill as CheckIcon } from 'react-icons/bs'

export default function BranchCard ({ idBranch, setIdBranch, state, city, streetName, houseNumber, phoneNumber, id }) {
  const apiW = 'https://api.whatsapp.com/send?phone='
  const imSelected = idBranch === id

  return (
    <a href={`${apiW}${phoneNumber}`} target='_blank' rel='noreferrer'>
      <Flex
        cursor='pointer' alignItems='flex-start' flexDirection='column' boxShadow='md' w='100%' bg='white' borderRadius={3} mt={2} mb={2}
        _hover={{
          bg: 'white'
        }}
        onClick={() => setIdBranch(id)}
      >
        <Flex w='100%' alignItems='center' justifyContent='space-between'>
          <Flex alignItems='center'>
            <Box m={5}>

              <Circle size='40px' bg='white' color='black'><SiWhatsapp size={30} color='green' /></Circle>

            </Box>
            <VStack pt={3} pb={3} alignItems='flex-start' colorScheme='blue'>
              <Text>{`Calle ${streetName} # ${houseNumber}.`}</Text>
              <Text>{`${city}, ${state}.`}</Text>
              <Text>Tel. {`${phoneNumber}`}</Text>
            </VStack>
            <Flex m={5} justifyContent='center'>
              {imSelected && <CheckIcon size={20} color='#38A169' />}
            </Flex>

          </Flex>
        </Flex>

      </Flex>
    </a>
  )
}
