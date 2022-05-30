import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, Box } from '@chakra-ui/react'
import BranchCreateorModify from '../BranchCreateOrModifyModal'
import { removeBranch } from '../../redux/actions/branches.actions'
import { useDispatch } from 'react-redux'

export function ModalBranchForm ({ isOpen, onClose, branch, countries }) {
  return (
    <div>
      <Modal size='lg' isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Datos de la Sucursal</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <BranchCreateorModify branch={branch} countries={countries} />
          </ModalBody>
          <ModalFooter />
        </ModalContent>
      </Modal>
    </div>
  )
}

export function ModalBranchDelete ({ isOpen, onClose, branch }) {
  const dispatch = useDispatch()

  function handleChangeBranchStatus (branch = {}) {
    dispatch(removeBranch(branch))
  }
  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent colorScheme='whatsapp'>
          <ModalHeader>Activar o Desactivar Sucursal</ModalHeader>
          <ModalCloseButton bg='tomato' color='black' variant='ghost' />
          <ModalBody>
            <Box margin='0.8rem' color='blackAlpha' fontWeight='500'>
              ¿Esta seguro que desea Modificar el estado actual de la sucursal?
            </Box>
            <Box margin='0.8rem'>
              <Button marginX='2.1rem' colorScheme='whatsapp' color='black' marginY='1rem' onClick={() => handleChangeBranchStatus(branch)}>Confirmar</Button>
              <Button marginX='2.1rem' colorScheme='red' marginY='1rem' onClick={onClose}>Cancelar</Button>
            </Box>
          </ModalBody>
          <ModalFooter />
        </ModalContent>
      </Modal>
    </div>
  )
}
