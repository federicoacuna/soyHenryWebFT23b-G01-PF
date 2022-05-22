import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  Show, Box, UnorderedList, ListItem, Icon, Heading, Text, Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Avatar,
  Flex,
  useToast
} from '@chakra-ui/react'
import { TiShoppingCart } from 'react-icons/ti'
import { BsShop } from 'react-icons/bs'
import { GrMenu } from 'react-icons/gr'
import styles from './index.module.css'
import ModalLogin from '../../components/ModalLogin'
import firebase from 'firebase/compat/app'
import { logOut, setProfileTab } from '../../redux/actions'
import { AiFillCaretDown } from 'react-icons/ai'

const NavBar = () => {
  const navigate = useNavigate()
  const cartProducts = useSelector(state => state.cartProducts.reduce((acc, curr) => acc + curr.quantity, 0))
  const [modal, setModal] = useState(false)
  const [isRegistrando, setIsRegistrando] = React.useState(false)
  const user = useSelector(state => state.user)
  const toastToDisplay = useSelector(state => state.toast)
  // const wishList = useSelector(state => state.wishlist)
  const dispatch = useDispatch()
  const toast = useToast()

  useEffect(() => {
    toastToDisplay.title && toast(toastToDisplay)
  }, [toastToDisplay])//eslint-disable-line

  const handleSubmit = (e) => {
    e.target.name === 'ingresar' && setModal(true)
    e.target.name === 'salir' && handleLogOut()
  }

  // useEffect(() => {
  //   if (user && user.id) {
  //     dispatch(getWishList())
  //   }
  // },[wishlist]) // eslint-disable-line

  function handleLogOut () {
    if (Object.keys(user).length > 0) {
      firebase.auth().signOut()
        .then(() => {
          dispatch(logOut())
          window.localStorage.setItem('auth', 'false')
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
    <>
      {/* Desktop */}
      <Show breakpoint='(min-width: 641px)'>
        <Box bg='primary' display='flex' justifyContent='space-between' color='accent' alignItems='center' p='1rem' maxWidth='1440px' margin='0 auto'>
          <Link to='/' className={styles.logo}>
            <Icon width='2rem' height='2rem' name='logo' as={BsShop} />
            <span>Ecommerce</span>
          </Link>
          <nav>
            <UnorderedList display='flex' alignItems='center' columnGap='1rem' margin='0'>
              <ListItem>
                <Link to='/' className={styles.navLink}>Home</Link>
              </ListItem>
              <ListItem>
                {Object.keys(user).length > 0 && <div className={styles.navLink} onClick={() => handleClick(4)}>Wishlist</div>}
              </ListItem>
              {Object.keys(user).length > 0 &&
                <Menu>
                  <Flex alignItems='center'>
                    <Avatar size='sm' mr={2} name={user.email && user.email.split('@')[0]} src='' />
                    <MenuButton _hover={{ bg: 'primary' }} _active={{ bg: 'primary' }} _focus={{ boxShadow: 'none' }} p={0} fontSize='1.25rem' fontWeight={700} bg='primary' as={Button} rightIcon={<AiFillCaretDown />}>{user.email ? 'Hola, ' + user.email.split('@')[0] : 'Hola, User'}
                    </MenuButton>
                  </Flex>
                  <MenuList bg='primary'>

                    <Link to='/perfil/' onClick={() => handleClick(0)}><MenuItem _focus={{ boxShadow: 'none' }} _hover={{ bg: '#232324' }} fontSize='1.25rem' bg='primary' className={styles.navLink} name='perfil'>Perfil</MenuItem></Link>
                    <Link to='/perfil/' onClick={() => handleClick(3)}><MenuItem _focus={{ boxShadow: 'none' }} _hover={{ bg: '#232324' }} fontSize='1.25rem' bg='primary' className={styles.navLink} name='mis-compras'>Mis compras</MenuItem></Link>
                    <MenuItem _focus={{ boxShadow: 'none' }} _hover={{ bg: '#232324' }} fontSize='1.25rem' bg='primary' onClick={handleSubmit} className={styles.navLink} name='salir'>Salir</MenuItem>
                  </MenuList>
                </Menu>}
              <ListItem>
                {Object.keys(user).length < 1 && <Link to='#' onClick={handleSubmit} className={styles.navLink} name='ingresar'>Ingresar</Link>}
              </ListItem>
              <ListItem>
                <Link to='/cart' className={styles.cartLink}>
                  {cartProducts > 0 ? <span>{cartProducts}</span> : undefined}
                  <Icon as={TiShoppingCart} width='2rem' height='2rem' />
                </Link>
              </ListItem>
            </UnorderedList>
          </nav>
          {/* <Fade inde in={isOpen}> */}
          <ModalLogin isRegistrando={isRegistrando} setIsRegistrando={setIsRegistrando} state={modal} setState={setModal}>
            <Heading color='black' textAlign='center'>{isRegistrando ? 'Registrate' : 'Inicia Sesion'}</Heading>
            <Text color='black' mt={2} textAlign='center'>Ingresa a tu cuenta para ver tus compras, favoritos, etc.</Text>
          </ModalLogin>
          {/* </Fade> */}
        </Box>
      </Show>

      {/* Mobile */}
      <Show breakpoint='(max-width: 640px)'>
        <Box bg='primary' display='flex' justifyContent='space-between' color='accent' p='1rem'>
          <Icon as={GrMenu} height='2.5rem' width='2.5rem' cursor='pointer' className={styles.menu} />
          <Link to='/cart' className={styles.cartLink}>
            {cartProducts > 0 ? <span>{cartProducts}</span> : undefined}
            <Icon as={TiShoppingCart} width='2rem' height='2rem' />
          </Link>
        </Box>
      </Show>
    </>
  )
}

export default NavBar
