import SearchBar from '../../components/SearchBar'
import FilterContainer from '../../components/FilterContainer'
import ProductList from '../../components/ProductsList'

function UsersHome () {
  return (
    <div>
      <SearchBar />
      <ProductList />
      <FilterContainer />
    </div>
  )
}

export default UsersHome
