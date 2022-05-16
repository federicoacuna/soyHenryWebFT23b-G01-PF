import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Show, Box, UnorderedList, ListItem, Icon, Heading, Text } from '@chakra-ui/react'
import { TiShoppingCart } from 'react-icons/ti'
import { BsShop } from 'react-icons/bs'
import { GrMenu } from 'react-icons/gr'
import styles from './index.module.css'
import ModalLogin from '../../components/ModalLogin'
import firebase from 'firebase/compat/app'
import { logOut, logIn } from '../../redux/actions'

const NavBar = () => {
  const cartProducts = useSelector(state => state.cartProducts.reduce((acc, curr) => acc + curr.quantity, 0))
  const [modal, setModal] = useState(false)
  const [isRegistrando, setIsRegistrando] = React.useState(false)
  const isAuth = useSelector(state => state.isAuth)
  const dispatch = useDispatch()

  // const { isOpen, onToggle } = useDisclosure()
  const handleSubmit = (e) => {
    e.target.name === 'ingresar' && setModal(true)
    e.target.name === 'salir' && handleLogOut()
  }

  useEffect(() => {
    JSON.parse(window.localStorage.getItem('auth')) && dispatch(logIn())
  }, []) // eslint-disable-line
  function handleLogOut () {
    if (isAuth) {
      firebase.auth().signOut()
        .then(() => {
          dispatch(logOut())
          window.localStorage.setItem('auth', 'false')
          alert('sesion cerrada')
        })
        .catch((error) => {
          console.log(error)
        })
    } else {
      alert('sin sesion iniciada')
    }
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
            <UnorderedList display='flex' alignItems='center' columnGap='1.5rem' margin='0'>
              <ListItem>
                <Link to='/' className={styles.navLink}>Home</Link>
              </ListItem>
              <ListItem>
                {isAuth ? <Link to='#' onClick={handleSubmit} className={styles.navLink} name='salir'>Salir</Link> : <Link to='#' onClick={handleSubmit} className={styles.navLink} name='ingresar'>Ingresar</Link>}
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
