import { Link,Text, VStack, Circle, Button, Flex, useToast, RadioGroup, Radio, Stack, Box, Divider } from '@chakra-ui/react' //eslint-disable-line
import { SiWhatsapp } from 'react-icons/si'

export default function BranchCard ({ state, city, streetName, houseNumber, phoneNumber, id }) {
  const apiW = 'https://api.whatsapp.com/send?phone='

  return (
    <Link href={`${apiW}${phoneNumber}`} isExternal style={{ textDecoration: 'none' }}>
      <Flex
        cursor='pointer' alignItems='flex-start' flexDirection='column' boxShadow='md' w='100%' bg='gray.100' borderRadius={3} mt={2} mb={2}
        _hover={{
          background: 'white',
          color: 'black.900',
          boxShadow: 'outline'
        }}
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
          </Flex>
        </Flex>

      </Flex>
    </Link>

  )
}
