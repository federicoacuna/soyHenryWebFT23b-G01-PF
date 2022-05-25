import FilterContainer from '../../components/FilterContainer'
import ProductList from '../../components/ProductsList'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import { logIn } from '../../redux/actions/users.actions'
import { clearProductFilter } from '../../redux/actions/products.actions'
import { useDispatch } from 'react-redux'
import { Box } from '@chakra-ui/react'
import SortingSelector from '../../components/SortingSelector'

function UsersHome () {
  const dispatch = useDispatch()

  firebase.auth().onIdTokenChanged(user => {
    if (user) {
      user.getIdToken().then(token => {
        dispatch(logIn(token))
      })
    }
  })

  return (
    <Box pl='7rem' pr='7rem' pt='4rem' pb='4rem' display='flex' flexDirection='column' justifyContent='center' alignSelf='center'>
      <Box alignSelf='flex-end' display='flex' gap='1rem' mb='1rem'>
        <Box display='flex' gap='1rem' justifyContent='center' alignItems='center'>Ordenar por <SortingSelector /></Box>
        <Box cursor='pointer' bg='#333333' height='2.45rem' pl='0.5rem' pr='0.5rem' pt='0.5rem' pb='0.8rem' color='accent' px='2rem' onClick={() => dispatch(clearProductFilter())} name='Clean'>Limpiar</Box>
      </Box>

      <Box display='flex' gap='2rem'>
        <FilterContainer />
        <ProductList />
      </Box>
    </Box>

  )
}

export default UsersHome
