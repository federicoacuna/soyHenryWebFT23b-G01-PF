import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Flex, Text, Input, Button } from '@chakra-ui/react'
import { TiSocialTwitter, TiSocialYoutube, TiSocialInstagram, TiSocialFacebook } from 'react-icons/ti'
import { sendEmail } from '../../redux/actions/nodemailer.action'
import { useDispatch } from 'react-redux'
import s from './index.module.css'

const Footer = () => {
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')

  function handleChange (e) {
    setEmail(e.target.value)
  }

  function handleSubmit (e) {
    e.preventDefault()
    console.log('handlesubmit', email)
    dispatch(sendEmail(email))
    setEmail('')
  }

  return (
    <Flex justifyContent='center' bg='primary'>
      <Flex w='76.1rem' pr='7.3rem' pl='7.3rem' pt='1rem' justifyContent='center' h='200px'>
        <Flex mr='30.6rem' flexDirection='column'>
          <Text color='secondary' mb={3}>Suscribite a nuestro newsletter</Text>
          <Flex w='400px'>
            <form onSubmit={handleSubmit} className={s.container}>
              <Input type='email' onChange={handleChange} value={email} bg='secondary' mr='15px' placeholder='E-mail...' />
              <Button w='20%' type='submit' color='white' colorScheme='button1'>Enviar</Button>
            </form>
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
