import React, { useEffect, useState } from 'react' // eslint.disable-line
import { updateOrderById } from '../../redux/actions/orders.actions'
import {
  List, //eslint-disable-line
  ListItem,
  ListIcon, //eslint-disable-line
  OrderedList, //eslint-disable-line
  UnorderedList,
  Box, //eslint-disable-line
  Heading,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Button,

  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure
} from '@chakra-ui/react'
import './AdmOrderCard.css'
import { useDispatch } from 'react-redux'

export default function OrderCard ({ ordenN, status, total, idUsuario, idPago, key }) {
  const dispatch = useDispatch()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [values, setValues] = useState({
    status: ''
  })
  useEffect(() => {
    console.log(values)
  }, [values]) //eslint-disable-line

  function handleChange (e) { //eslint-disable-line
    setValues({
      status: e.target.value
    })
  }

  function handleSubmit (orderId, status) {
    // console.log(orderId, status)
    try {
      dispatch(updateOrderById(orderId, status))
    } catch (error) {
      return error
    }
  }

  return (
    <div className='listDes'>
      <UnorderedList className='listDes' key={key}>
        <div className='titleList'>
          <ListItem><Heading as='h3' size='lg'>N° de orden: {ordenN}</Heading></ListItem>
        </div>
        <ListItem><Heading as='h5' size='sm'>Estado: {status}</Heading></ListItem>
        <ListItem><Heading as='h5' size='sm'>Total: {total}</Heading></ListItem>
        <ListItem><Heading as='h5' size='sm'>ID de Usuario: {idUsuario}</Heading></ListItem>
        <ListItem><Heading as='h5' size='sm'>Metodo de pago: {idPago}</Heading></ListItem>
      </UnorderedList>

      <div className='accordion'>

        <Accordion defaultIndex={[0]} allowMultiple>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex='1' textAlign='left'>
                  <Heading as='h4' size='md'>Opciones</Heading>
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>

              <Button onClick={onOpen}>Modificar orden</Button>

              <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Opciones de la orden N°: {ordenN}</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <Heading as='h4' size='md'>Cambiar estado a</Heading>
                    <select
                      name='estado'
                      value={values.status}
                      onChange={e => handleChange(e)}
                    >
                      <option value=''>Cambiar estado a</option>
                      <option value='CREADA'>CREATED</option>
                      <option value='EN_PROCESO'>EN PROCESO</option>
                      <option value='DESPACHADA'>DESPACHADA</option>
                      <option value='ENVIADA'>ENVIADA</option>
                      <option value='ENTREGADA'>ENTREGADA</option>
                      <option value='REEMBOLSADA'>REEMBOLSADA</option>
                    </select>
                  </ModalBody>

                  <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={onClose}>
                      Close
                    </Button>
                    <Button onClick={() => handleSubmit(ordenN, values.status)} variant='ghost'>Guardar</Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>

      </div>
    </div>
  )
}
/* <Button onClick={() => handleClick(ordenN)} variant='solid'>Modificar orden</Button> */
