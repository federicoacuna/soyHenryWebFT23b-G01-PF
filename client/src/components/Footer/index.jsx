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
    <Flex justifyContent='space-between' bg='primary' width='80vw' margin='auto' minHeight='150px' p='1rem'>
      <Flex flexDirection='column' justifyContent='center' alignItems='center'>
        <Text color='secondary' mb={3} alignSelf='flex-start'>Suscribite a nuestro newsletter</Text>
        <Flex w='400px' alignSelf='flex-start'>
          <form onSubmit={handleSubmit} className={s.container}>
            <Input type='email' outline='none' _focus={{ outline: 'none' }} onChange={handleChange} value={email} bg='secondary' mr='15px' placeholder='E-mail...' />
            <Button w='20%' type='submit' color='white' colorScheme='button1'>Enviar</Button>
          </form>
        </Flex>
      </Flex>
      <Flex flexDirection='column' justifyContent='center' alignItems='center'>
        <Text color='secondary' ml='1rem' alignSelf='flex-start' mb={3}>Seguinos en</Text>
        <Flex color='secondary' alignSelf='flex-start'>
          <Link className={s.socialMediaIcons} to='#'><TiSocialTwitter size={37} /></Link>
          <Link className={s.socialMediaIcons} to='#'><TiSocialYoutube size={37} /></Link>
          <Link className={s.socialMediaIcons} to='#'><TiSocialInstagram size={37} /></Link>
          <Link className={s.socialMediaIcons} to='#'><TiSocialFacebook size={37} /></Link>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default Footer
