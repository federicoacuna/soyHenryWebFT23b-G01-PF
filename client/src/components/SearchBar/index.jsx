import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { addProductFilter } from '../../redux/actions/products.actions'
import { Box, Input, Icon } from '@chakra-ui/react'
import { BiSearchAlt } from 'react-icons/bi'
import styles from './index.module.css'
// import SortingSelector from '../SortingSelector'

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
      dispatch(addProductFilter({ name: 'search', value: item }))
      setItem('')
    }
  }

  // function handleClick (e) {
  //   dispatch(clearFilterParams())
  // }

  return (
    <Box display='flex' marginTop='2rem' justifyContent='center' marginBottom='2rem'>
      <form onSubmit={handleSubmit} className={styles.form}>
        <Box position='relative'>
          <Input
            placeholder='Buscar...'
            onChange={handleInputChange}
            value={item}
            bg='white'
            color='#000'
            pl='1rem'
            pr='2.5rem'
            height='2.2rem'
            _focus={{ outline: 'none' }}

          />
          <Icon
            as={BiSearchAlt}
            position='absolute'
            right='1rem'
            top='50%'
            transform='translateY(-50%)'
            w='1.5rem'
            h='1.5rem'
            color='#333333'
          />
        </Box>
        {/* <Button bg='primary' color='accent' px='2rem' pb='0.2rem' _hover _active _focus onClick={handleClick} name='Clean'>Limpiar</Button>
        <SortingSelector /> */}
      </form>
    </Box>
  )
}
