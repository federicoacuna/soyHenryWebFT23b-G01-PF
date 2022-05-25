import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  Box, UnorderedList, ListItem, Icon, Heading, Text, Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Avatar,
  Flex,
  useToast
} from '@chakra-ui/react'
import { BsCart, BsShopWindow } from 'react-icons/bs'

import s from './index.module.css'
import ModalLogin from '../../components/ModalLogin'
import firebase from 'firebase/compat/app'
import { getWishList, logOut, setProfileTab } from '../../redux/actions'
import { AiFillCaretDown } from 'react-icons/ai'
import SearchBar from '../SearchBar'
import { MdOutlineFavoriteBorder } from 'react-icons/md'

const NavBar = () => {
  const navigate = useNavigate()
  const cartProducts = useSelector(state => state.cartProducts.reduce((acc, curr) => acc + curr.quantity, 0))
  const [modal, setModal] = useState(false)
  const [isRegistrando, setIsRegistrando] = useState(false)
  const token = useSelector(state => state.token)
  const user = useSelector(state => state.user)
  const toastToDisplay = useSelector(state => state.toast)
  const dispatch = useDispatch()
  const toast = useToast()

  useEffect(() => {
    dispatch(getWishList())
  }, [token])//eslint-disable-line

  useEffect(() => {
    toastToDisplay.title && toast(toastToDisplay)
  }, [toastToDisplay])//eslint-disable-line

  const handleSubmit = (e) => {
    e.target.name === 'ingresar' && setModal(true)
    e.target.name === 'salir' && handleLogOut()
  }

  function handleLogOut () {
    if (token) {
      firebase.auth().signOut()
        .then(() => {
          dispatch(logOut())
          window.localStorage.clear()
          toast({
            description: 'Sesion cerrada',
            status: 'warning',
            duration: 5000,
            isClosable: false
          })
          navigate('/')
        })
        .catch((error) => {
          console.log(error)
        })
    } else {
      alert('sin sesion iniciada')
    }
  }

  function handleClick (tab) {
    dispatch(setProfileTab(tab))
    navigate('/perfil')
  }

  return (
    <Box>
      <Box position='relative' height='5rem' bg='#333333' display='flex' justifyContent='space-between' color='accent' alignItems='center' pl='7rem' pr='7rem'>
        <Link to='/' className={s.logo}>
          <Icon width='1.7rem' height='1.7rem' name='logo' as={BsShopWindow} />
          <span>Salchistore</span>
        </Link>
        <Box />
        <Box>
          <UnorderedList display='flex' alignItems='center' gap='1rem' mr='5rem'>
            {token
              ? <>
                <ListItem>
                  <div className={s.navLink} onClick={() => handleClick(4)}><MdOutlineFavoriteBorder /></div>
                </ListItem>
                <Menu>
                  <Flex bg='#333333' alignItems='center'>
                    <Avatar size='sm' mr={2} name={user.email && user.email.split('@')[0]} src='' />
                    <MenuButton _hover={{ bg: '#333333' }} _active={{ bg: '#333333' }} _focus={{ boxShadow: 'none' }} p={0} fontSize='1rem' fontWeight={700} bg='#333333' as={Button} rightIcon={<AiFillCaretDown />}>{user.firstname ? 'Hola, ' + user.firstname : user.email ? 'Hola, ' + user.email.split('@')[0] : 'Hola, User'}
                    </MenuButton>
                  </Flex>
                  <MenuList bg='#333333' mt='1rem' width='3rem'>
                    <Link to='/perfil/' onClick={() => handleClick(0)}><MenuItem _focus={{ boxShadow: 'none' }} fontSize='1rem' bg='#333333' name='perfil'>Perfil</MenuItem></Link>
                    <Link to='/perfil/' onClick={() => handleClick(3)}><MenuItem _focus={{ boxShadow: 'none' }} fontSize='1rem' bg='#333333' name='mis-compras'>Mis compras</MenuItem></Link>
                    <MenuItem _focus={{ boxShadow: 'none' }} fontSize='1rem' bg='#333333' onClick={handleSubmit} name='salir'>Salir</MenuItem>
                  </MenuList>
                </Menu>
                  </>//eslint-disable-line
              : <ListItem fontSize='1.25rem' mr='2.5rem'><Link to='#' onClick={handleSubmit} name='ingresar'>Ingresar</Link></ListItem>}
            <ListItem display='flex' width='100%'>
              <p className={s.trapecio} />
            </ListItem>
          </UnorderedList>
        </Box>

        {/* <Fade inde in={isOpen}> */}
        <ModalLogin isRegistrando={isRegistrando} setIsRegistrando={setIsRegistrando} state={modal} setState={setModal}>
          <Heading color='black' textAlign='center'>{isRegistrando ? 'Registrate' : 'Inicia Sesion'}</Heading>
          <Text color='black' mt={2} textAlign='center'>Ingresa a tu cuenta para ver tus compras, favoritos, etc.</Text>
        </ModalLogin>
        {/* </Fade> */}
      </Box>
      <Box position='absolute' top='-2' left='42%'>
        <SearchBar />
        <Link className={token ? s.cartLink : s.cartLink2} to='/cart'>
          {cartProducts > 0 ? <span>{cartProducts}</span> : undefined}
          <BsCart fontSize='1.7rem' color='#333333' />
        </Link>
      </Box>
    </Box>
  )
}

export default NavBar
