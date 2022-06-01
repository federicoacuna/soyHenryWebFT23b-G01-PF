import { Flex, Tabs, TabPanels, Tab, TabPanel, Box, Heading, Spinner } from '@chakra-ui/react'
import { BiUserCircle, BiDirections, BiMoney, BiShoppingBag, BiHeart, BiStar } from 'react-icons/bi'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import AdminCategoriesPanel from '../../components/AdminCategoriesPanel'
import InventoryPanel from '../../components/InventoryPanel'
import AdmOrderPanel from '../../components/AdmOrderPanel/Table'
import AdmUserPanel from '../../components/AdmUserContainer/AdminUsersPanel'
import BranchesTable from '../../components/BranchesTable/BranchesTable'
import AdminProductsPanel from '../../components/AdminProductsPanel'

export default function AdminsHome () {
  const { user } = useSelector(state => state.users)

  if (user.isAdmin === undefined) return <Spinner />
  if (!user.isAdmin) return <Navigate to='/' replace />

  return (
    <Flex display={!user.isAdmin ? 'none' : 'flex'} p='7rem'>
      <Tabs borderColor='active' w='100%'>
        <Flex flexDirection='row' h='75vh'>
          <Flex alignItems='flex-start' bg='white' color='black' borderRight='2px' borderColor='grey' flexWrap='wrap' flexDirection='column' justifyContent='space-around'>
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
            ><BiHeart /> <Box textAlign='start' ml='10px'>INVENTARIO</Box>
            </Tab>
          </Flex>

          <TabPanels bg='secondary' overflow='scroll'>
            <TabPanel>
              <Heading mb={5}>Gestion de ordenes</Heading>
              <AdmOrderPanel />
            </TabPanel>
            <TabPanel overflow='hidden'>
              <Heading mb={5}>Gestión de productos</Heading>
              <AdminProductsPanel />
            </TabPanel>
            <TabPanel>
              <Heading mb={5}>Gestion de Categorias</Heading>
              <AdminCategoriesPanel />
            </TabPanel>
            <TabPanel>
              <Heading mb={2}>Gestion de Sucursales</Heading>
              <BranchesTable />
            </TabPanel>
            <TabPanel>
              <Heading mb={5}>Gestion de Usuarios</Heading>
              <AdmUserPanel />
            </TabPanel>
            <TabPanel>
              <Heading mb={5}>Gestión de inventario</Heading>
              <InventoryPanel />
            </TabPanel>
          </TabPanels>

        </Flex>
      </Tabs>
    </Flex>
  )
}
