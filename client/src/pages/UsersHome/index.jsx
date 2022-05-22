import SearchBar from '../../components/SearchBar'
import FilterContainer from '../../components/FilterContainer'
import ProductList from '../../components/ProductsList'
import styles from './index.module.css'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import { logIn } from '../../redux/actions'
import { useDispatch } from 'react-redux'

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
    <div>
      <SearchBar />
      <div className={styles.mainContainer}>
        <FilterContainer />
        <ProductList />
      </div>
    </div>
  )
}

export default UsersHome
