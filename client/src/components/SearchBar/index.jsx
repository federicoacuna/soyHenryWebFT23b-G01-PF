import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { addFilterParams, clearFilterParams } from '../../redux/actions/index'
import { Box, Input, Button, Icon } from '@chakra-ui/react'
import { BsSearch } from 'react-icons/bs'
import styles from './index.module.css'

export default function SearchBar () {
  const dispatch = useDispatch()
  const [item, setItem] = useState('')

  function handleInputChange (e) {
    setItem(e.target.value)
  }

  function handleSubmit (e) {
    e.preventDefault()
    if (item.length === 0) {
      return (
        alert('Please write an item to search')
      )
    } else {
      dispatch(addFilterParams({ name: 'search', value: item }))
      setItem('')
    }
  }

  function handleClick (e) {
    dispatch(clearFilterParams())
  }

  return (
    <Box display='flex' marginTop='2rem' justifyContent='center' marginBottom='2rem'>
      <form onSubmit={handleSubmit} className={styles.form}>
        <Box position='relative'>
          <Input
            placeholder='Buscar ...'
            onChange={handleInputChange}
            value={item}
            bg='secondary'
            color='#000'
            pl='1rem'
            pr='2.5rem'
            _focus
            borderRadius='1rem'
            boxShadow='0px 1px 2px 1px rgba(0,0,0,0.25)'

          />
          <Icon
            as={BsSearch}
            position='absolute'
            right='1rem'
            top='50%'
            transform='translateY(-50%)'
            w='1.5rem'
            h='1.5rem'
            color='#ABABAB'
          />
        </Box>
        <Button bg='primary' color='accent' px='2rem' pb='0.2rem' _hover _active _focus onClick={handleClick} name='Clean'>Clean</Button>
      </form>
    </Box>
  )
}
