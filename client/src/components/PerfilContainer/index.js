import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import s from './index.module.css'
import { Flex, Tabs, TabPanels, Tab, TabPanel, Box, Heading, Button } from '@chakra-ui/react'
import { BiUserCircle, BiDirections, BiMoney, BiShoppingBag, BiHeart, BiStar } from 'react-icons/bi'
import DatosPersonales from '../PerfilPersonalData'
import MyShopping from '../MyShopping'
import Reviews from '../Reviews'
import AddressCreator from '../AddressCreator'
import PaymentCard from '../PaymentCard'
import PaymentCreate from '../PaymentCreate'
import WishList from '../WishList'
import { setProfileTab, getCountries } from '../../redux/actions'
import { getUserAddresses } from '../../redux/actions/addresses.actions'
import AddressContainer from '../AddressContainer'

export default function PerfilContainer () {
  const dispatch = useDispatch()
  const userPayments = useSelector(state => state.user.userPayments)
  const [Click, setClick] = useState({
    payment: false,
    address: false
  })

  useEffect(() => {
    dispatch(getCountries())
    dispatch(getUserAddresses())
  }, [])//eslint-disable-line

  const tabIndex = useSelector(state => state.profileTab)
  const handleClickAddress = () => {
    // setClick(true)
    Click.address === false ? setClick({ ...Click, address: true }) : setClick({ ...Click, address: false })
  }
  const handleClickPayment = () => {
    // setClick(true)
    Click.payment === false ? setClick({ ...Click, payment: true }) : setClick({ ...Click, payment: false })
  }

  return (
    <Flex w='85vw'>
      <Tabs borderColor='active' w='100%' index={tabIndex} onChange={(index) => dispatch(setProfileTab(index))}>
        <Flex flexDirection='row' h='75vh'>
          <Flex alignItems='flex-start' bg='primary' color='white' flexWrap='wrap' flexDirection='column' justifyContent='space-around'>
            <Tab
              justifyContent='flex-start'
              w='100%' _focus={{ borderColor: 'none' }}
              _active={{ color: 'white' }}
              fontWeight={500}
            ><BiUserCircle /> <Box textAlign='start' ml='10px'>Datos personales</Box>
            </Tab>
            {/* <Tab
              justifyContent='flex-start'
              w='100%'
              _focus={{ borderColor: 'none' }}
              _active={{ color: 'white' }}
              fontWeight={500}
            ><BiHistory /> <Box textAlign='start' ml='10px'>Historial</Box>
            </Tab> */}
            <Tab
              justifyContent='flex-start'
              w='100%'
              _focus={{ borderColor: 'none' }}
              _active={{ color: 'white' }}
              fontWeight={500}
            ><BiDirections /> <Box textAlign='start' ml='10px'>Direcciones</Box>
            </Tab>
            <Tab
              justifyContent='flex-start'
              w='100%'
              _focus={{ borderColor: 'none' }}
              _active={{ color: 'white' }}
              fontWeight={500}
            ><BiMoney /> <Box textAlign='start' ml='10px'>Metodos de pago</Box>
            </Tab>
            <Tab
              justifyContent='flex-start'
              w='100%'
              _focus={{ borderColor: 'none' }}
              _active={{ color: 'white' }}
              fontWeight={500}
            ><BiShoppingBag /> <Box textAlign='start' ml='10px'>Mis compras</Box>
            </Tab>
            <Tab
              justifyContent='flex-start'
              w='100%'
              _focus={{ borderColor: 'none' }}
              _active={{ color: 'white' }}
              fontWeight={500}
            ><BiHeart /> <Box textAlign='start' ml='10px'>Lista de deseos</Box>
            </Tab>
            <Tab
              justifyContent='flex-start'
              w='100%'
              _focus={{ borderColor: 'none' }}
              _active={{ color: 'white' }}
              fontWeight={500}
            ><BiStar /> <Box textAlign='start' ml='10px'>Reseñas</Box>
            </Tab>
          </Flex>

          <TabPanels bg='secondary' overflow='scroll'>
            <TabPanel>
              <Heading mb={5}>Datos personales</Heading>
              <DatosPersonales />
            </TabPanel>
            {/* <TabPanel>
              <Heading mb={5}>Historial</Heading>
            </TabPanel> */}
            <TabPanel>
              <Heading mb={5}>Direcciones</Heading>
              {/* <Box mb={5}>Elige donde recibir tus compras.</Box> */}
              {Click.address
                ? <>
                  <AddressContainer />
                  <Button _hover={{ color: 'white' }} color='white' bg='button' onClick={handleClickAddress}>Agregar una dirección</Button>
                  {/* eslint-disable-next-line */}
                </>
                : <>
                  <AddressCreator handleClickAddress={handleClickAddress} />
                  {/* eslint-disable-next-line */}
              </>}

            </TabPanel>
            <TabPanel>
              <Heading mb={2}>Métodos de pago</Heading>
              {/* <Box mb={5}>Elige cómo quieres pagar tus compras.</Box> */}
              {userPayments && userPayments.map((payment) => (
                <PaymentCard
                  key={payment.id}
                  paymentType={payment.paymentType}
                  cardNumber={payment.cardNumber}
                  expirationDate={payment.expirationDate}
                  provider={payment.provider}
                  id={payment.id}
                />
              ))}
              <Button _hover={{ color: 'white' }} color='white' bg='button' onClick={handleClickPayment}>Agregar método de pago</Button>
              {Click.payment && <>
                <PaymentCreate handleClickPayment={handleClickPayment} />
                {/* eslint-disable-next-line */}
              </>}
            </TabPanel>
            <TabPanel>
              <Heading mb={5}>Mis compras</Heading>
              <MyShopping />
            </TabPanel>
            <TabPanel>
              <Heading mb={5}>Lista de deseos</Heading>
              <WishList />
            </TabPanel>
            <TabPanel>
              <Heading mb={5}>Reseñas</Heading>
              <Reviews />
            </TabPanel>
          </TabPanels>
        </Flex>

      </Tabs>
    </Flex>
  )
}
