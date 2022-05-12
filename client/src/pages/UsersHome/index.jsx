import SearchBar from '../../components/SearchBar'
import FilterContainer from '../../components/FilterContainer'
import ProductList from '../../components/ProductsList'
import styles from './index.module.css'

function UsersHome () {
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
