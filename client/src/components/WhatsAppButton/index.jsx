import { IconButton, useDisclosure } from '@chakra-ui/react'
import ModalWhatsAppBranches from '../ModalWhatsAppBranches'
import { BsWhatsapp } from 'react-icons/bs'
// import whastimg from './whatsapp.png'

export default function WhatsAppButton ({ branches }) {
  const { isOpen, onOpen, onClose } = useDisclosure() // eslint-disable-line]

  function handleModal (e) {
    onOpen()
  }
  return (
    <>
      <IconButton
        bg='none'
        borderRadius={100}
        border='none'
        onClick={(e) => handleModal(e)}
        position='fixed'
        bottom='35px'
        right={['16px', '100px']}
        zIndex={1}
        colorScheme='whatsapp'
        icon={<BsWhatsapp size='55' />}
        size='lg'
        variant='outline'
      >Sucursal
      </IconButton>
      <ModalWhatsAppBranches
        isOpen={isOpen} onOpen={onOpen} onClose={onClose} branches={branches}
      />
    </>
  )
}
