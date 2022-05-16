import { useDispatch, useSelector } from 'react-redux'
import CartItems from '../../components/CartItems'
import CartDeleteAllProducts from '../../components/CartDeleteAllProducts'
import { Link, useNavigate } from 'react-router-dom'
import s from './index.module.css'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { useState } from 'react'
import ModalLogin from '../../components/ModalLogin'
import { Heading, Text } from '@chakra-ui/react'
import { setOrderItems } from '../../redux/actions'

export const Cart = () => {
  const cartProducts = useSelector(state => state.cartProducts)
  const [modal, setModal] = useState(false)
  const user = useSelector(state => state.user.id)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSubmit = () => {
    dispatch(setOrderItems())
    user ? navigate('/addresses') : setModal(true)
  }

  return (
    <div className={s.containerAll}>
      <Link to='/' className={s.arrow}><IoMdArrowRoundBack size={30} _hover={{ bg: 'black' }} /></Link>

      <div className={s.container}>
        <div className={s.btnDelete}>
          {cartProducts.length ? <CartDeleteAllProducts /> : <p />}
        </div>

        <CartItems />
        <p className={s.total}>Total: <span>${cartProducts.reduce((acc, p) => acc + (p.quantity * p.price), 0)}</span> </p>
        {cartProducts.length ? <button onClick={handleSubmit} className={s.btnCheckout}>Continuar compra</button> : <p />}
      </div>
      {/* <Fade in={isOpen}> */}
      <ModalLogin state={modal} setState={setModal}>
        <Heading color='black' textAlign='center'>No has iniciado sesión</Heading>
        <Text color='black' mt={2} textAlign='center'>Para seguir con tu compra debes registrarte o iniciar sesión.</Text>
      </ModalLogin>
      {/* </Fade> */}
    </div>

  )
}

export default Cart
