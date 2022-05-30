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
    console.log(branch)
    dispatch(removeBranch(branch.id))
  }
  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Activar o Desactivar Sucursal</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box margin='0.8rem'>
              ¿Esta seguro que desea Modificar el estado actual de la sucursal?
            </Box>
            <Box margin='0.8rem'>
              <Button margin='0.8 rem' onClick={() => handleChangeBranchStatus(branch)}>Confirmar</Button>
              <Button onClick={onClose}>Cancelar</Button>
            </Box>
          </ModalBody>
          <ModalFooter />
        </ModalContent>
      </Modal>
    </div>
  )
}
