import React from 'react'
import { Flex, Tabs, TabPanels, Tab, TabPanel, Box, Heading } from '@chakra-ui/react'
import { BiUserCircle, BiDirections, BiMoney, BiShoppingBag, BiHeart, BiStar } from 'react-icons/bi'

import AdminCategoriesPanel from '../../components/AdminCategoriesPanel'

export default function AdminsHome () {
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
            ><BiUserCircle /> <Box textAlign='start' ml='10px'>ORDENES</Box>
            </Tab>
            <Tab
              justifyContent='flex-start'
              w='100%'
              _focus={{ borderColor: 'none' }}
              _active={{ color: 'white' }}
              fontWeight={500}
            ><BiDirections /> <Box textAlign='start' ml='10px'>PRODUCTOS</Box>
            </Tab>
            <Tab
              justifyContent='flex-start'
              w='100%'
              _focus={{ borderColor: 'none' }}
              _active={{ color: 'white' }}
              fontWeight={500}
            ><BiStar /> <Box textAlign='start' ml='10px'>CATEGORIAS</Box>
            </Tab>
            <Tab
              justifyContent='flex-start'
              w='100%'
              _focus={{ borderColor: 'none' }}
              _active={{ color: 'white' }}
              fontWeight={500}
            ><BiMoney /> <Box textAlign='start' ml='10px'>SUCURSALES</Box>
            </Tab>
            <Tab
              justifyContent='flex-start'
              w='100%'
              _focus={{ borderColor: 'none' }}
              _active={{ color: 'white' }}
              fontWeight={500}
            ><BiShoppingBag /> <Box textAlign='start' ml='10px'>USUARIOS</Box>
            </Tab>
            <Tab
              justifyContent='flex-start'
              w='100%'
              _focus={{ borderColor: 'none' }}
              _active={{ color: 'white' }}
              fontWeight={500}
            ><BiHeart /> <Box textAlign='start' ml='10px'>ESPACIO PUBLICITARIO</Box>
            </Tab>
          </Flex>

          <TabPanels bg='secondary' overflow='scroll'>
            <TabPanel>
              <Heading mb={5}>Gestion de ordenes</Heading>
            </TabPanel>
            <TabPanel>
              <Heading mb={5}>Gestion de productos</Heading>
            </TabPanel>
            <TabPanel>
              <Heading mb={5}>Gestion de Categorias</Heading>
              <AdminCategoriesPanel />
            </TabPanel>
            <TabPanel>
              <Heading mb={2}>Gestion de Sucursales</Heading>
            </TabPanel>
            <TabPanel>
              <Heading mb={5}>Gestion de Usuarios</Heading>
            </TabPanel>
            <TabPanel>
              <Heading mb={5}>Pautas publicitarias</Heading>
            </TabPanel>

          </TabPanels>
        </Flex>

      </Tabs>
    </Flex>
  )
}
