import { Box, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton } from '@chakra-ui/react'
// import { ThemeProvider } from '@emotion/react'
import BranchCard from '../BanchCard'
export default function ModalBranches ({ isOpen, onClose, onOpen, branches }) {
  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        scrollBehavior='inside'
        size='sm'
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            bg='primary'
            color='secondary'
            fontWeight='semibold'
            letterSpacing='wide'
          >Contáctanos por WhatsApp
          </ModalHeader>
          <ModalCloseButton _hover={{ bg: 'primary' }} borderRadius='md' bg='primary' color='white' px={4} h={8} mt='0.4rem' />
          <ModalBody bg='white'>

            <Box w='100%'>
              {Array.isArray(branches)
                ? <>
                  {branches.map((el, i) =>
                    <BranchCard key={i} countryId={el.countryId} state={el.state} city={el.city} streetName={el.streetName} houseNumber={el.houseNumber} id={el.id} phoneNumber={el.phoneNumber} />
                  )}
            </> // eslint-disable-line

                : 'No hay sucursales disponibles'}
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>

    </>
  )
}
