import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import s from './index.module.css'
import { Flex, Tabs, TabPanels, Tab, TabPanel, Box, Heading, Button } from '@chakra-ui/react'
import { BiUserCircle, BiDirections, BiShoppingBag, BiHeart, BiStar } from 'react-icons/bi'
import DatosPersonales from '../../components/PerfilPersonalData'
import MyShopping from '../../components/MyShopping'
import ReviewsContainer from '../../components/ReviewsContainer'
import AddressCreator from '../../components/AddressCreator'
import WishList from '../../components/WishList'
import { getCountriesList } from '../../redux/actions/countries.actions'
import { setUsersPanelTab } from '../../redux/actions/system.actions'
import { getUserAddresses } from '../../redux/actions/addresses.actions'
import AddressContainer from '../../components/AddressContainer'

export default function UserProfile () {
  const dispatch = useDispatch()
  const [Click, setClick] = useState({
    payment: false,
    address: false
  })

  useEffect(() => {
    dispatch(getCountriesList())
    dispatch(getUserAddresses())
  }, [])//eslint-disable-line

  const tabIndex = useSelector(state => state.system.usersPanelSelectedTab)
  const handleClickAddress = () => {
    // setClick(true)
    Click.address === false ? setClick({ ...Click, address: true }) : setClick({ ...Click, address: false })
  }

  return (
    <Flex justifyContent='center' pl='7rem' pr='7rem' pt='3rem' pb='3rem'>
      <Flex w='100%'>
        <Tabs borderColor='active' boxShadow='md' w='100%' index={tabIndex} onChange={(index) => dispatch(setUsersPanelTab(index))}>
          <Flex flexDirection='row' h='75vh'>
            <Flex alignItems='flex-start' bg='white' color='#333333' flexWrap='wrap' flexDirection='column' justifyContent='space-around'>
              <Tab
                justifyContent='flex-start'
                w='100%' _focus={{ borderColor: 'none' }}
                _active={{ color: 'white' }}
                fontWeight={500}
              ><BiUserCircle /> <Box textAlign='start' ml='10px'>Datos personales</Box>
              </Tab>
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

            <TabPanels bg='white' borderLeft='2px' borderStyle='inherit' ml='1rem' borderColor='secondary' overflow='auto'>
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
                {!Click.address
                  ? <>
                    <AddressContainer />
                    <Button borderRadius='none' mr='1rem' _hover={{ bg: 'none' }} name='AddAddress' border='2px' borderColor='accent' color='accent' bg='white' onClick={handleClickAddress}>Agregar una dirección</Button>
                    {/* eslint-disable-next-line */}
                </>
                  : <>
                    <AddressCreator handleClickAddress={handleClickAddress} />
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
                <ReviewsContainer />
              </TabPanel>
            </TabPanels>
          </Flex>

        </Tabs>
      </Flex>
    </Flex>

  )
}
