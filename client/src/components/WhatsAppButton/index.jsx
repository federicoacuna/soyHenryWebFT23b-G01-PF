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
        bottom='111px'
        right={['32px', '30px']}
        zIndex={1}
        colorScheme='whatsapp'
        icon={<BsWhatsapp color='primary' size='55' />}
        size='lg'
        variant='outline'
        _focus={{ outline: 'none' }}
        _hover={{ color: 'whatsapp' }}
        _active={{ color: 'whatsapp' }}
      >Sucursal
      </IconButton>
      <ModalWhatsAppBranches
        isOpen={isOpen} onOpen={onOpen} onClose={onClose} branches={branches}
      />
    </>
  )
}
