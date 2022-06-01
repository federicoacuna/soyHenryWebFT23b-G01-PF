import FilterContainer from '../../components/FilterContainer'
import ProductList from '../../components/ProductsList'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import { logIn } from '../../redux/actions/users.actions'
import { useDispatch } from 'react-redux'
import { Box } from '@chakra-ui/react'
import { useEffect } from 'react'
import { removeBuyNowItem } from '../../redux/actions/buyNow.actions'

function UsersHome () {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(removeBuyNowItem())
  })

  firebase.auth().onIdTokenChanged(user => {
    if (user) {
      user.getIdToken().then(token => {
        dispatch(logIn(token))
      })
    }
  })

  return (
    <Box pl='7rem' pr='7rem' pt='4rem' pb='4rem' display='flex' flexDirection='column' justifyContent='center' alignSelf='center'>

      <Box display='flex' justifyContent='center'>
        <FilterContainer />
        <ProductList />
      </Box>
    </Box>

  )
}

export default UsersHome
