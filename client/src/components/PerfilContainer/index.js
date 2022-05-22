import React from 'react'
import { useSelector } from 'react-redux'
// import s from './index.module.css'
import { Flex, Tabs, TabPanels, Tab, TabPanel, Box, Heading } from '@chakra-ui/react'
import { BiUserCircle, BiDirections, BiMoney, BiShoppingBag, BiHeart, BiStar } from 'react-icons/bi'
import DatosPersonales from '../PerfilPersonalData'
import MyShopping from '../MyShopping'
import Reviews from '../Reviews'
import AddressCard from '../AddressCard'
import AddressCreator from '../AddressCreator'
import PaymentCard from '../PaymentCard'
import PaymentCreate from '../PaymentCreate'
import WishList from '../WishList'

export default function PerfilContainer () {
  const userAddresses = useSelector(state => state.user.userAddresses)
  const userPayments = useSelector(state => state.user.userPayments)

  return (
    <Flex w='85vw'>
      <Tabs borderColor='active' w='100%'>
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
            ><BiDirections /> <Box textAlign='start' ml='10px'>Direcciones de envio</Box>
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
            ><BiStar /> <Box textAlign='start' ml='10px'>Opiniones</Box>
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
              <Heading mb={5}>Domicilios</Heading>
              {/* <Box mb={5}>Elige donde recibir tus compras.</Box> */}
              {userAddresses && userAddresses.map(address => <AddressCard
                key={address.id}
                id={address.id}
                postalCode={address.postalCode}
                streetName={address.streetName}
                houseNumber={address.houseNumber}
                city={address.city}
                state={address.state}
                country={address.country}
                                                             />)}
              <Heading mb={5} mt={5}>Agregar un domicilio</Heading>
              <AddressCreator />
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
              <Heading mb={5} mt={5}>Agregar un método de pago</Heading>
              <PaymentCreate />
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
              <Heading mb={5}>Opiniones</Heading>
              <Reviews />
            </TabPanel>
          </TabPanels>
        </Flex>

      </Tabs>
    </Flex>
  )
}
