import React from 'react'
import { Link } from 'react-router-dom'
import { Flex, Text, Input, Button } from '@chakra-ui/react'
import { TiSocialTwitter, TiSocialYoutube, TiSocialInstagram, TiSocialFacebook } from 'react-icons/ti'

const Footer = () => {
  return (
    <Flex justifyContent='center' bg='primary'>
      <Flex w='76.1rem' pr='7.3rem' pl='7.3rem' pt='1rem' justifyContent='center' h='200px'>
        <Flex mr='30.6rem' flexDirection='column'>
          <Text color='secondary' mb={3}>Suscribite a nuestro newsletter</Text>
          <Flex>
            <Input bg='secondary' mr='15px' placeholder='E-mail...' />
            <Button colorScheme='button1'>Enviar</Button>
          </Flex>
        </Flex>
        <Flex w='250px' flexDirection='column'>
          <Text color='secondary' mb={3}>Seguinos en:</Text>
          <Flex color='secondary' justifyContent='space-between'>
            <Link to='#'><TiSocialTwitter size={37} /></Link>
            <Link to='#'><TiSocialYoutube size={37} /></Link>
            <Link to='#'><TiSocialInstagram size={37} /></Link>
            <Link to='#'><TiSocialFacebook size={37} /></Link>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default Footer
