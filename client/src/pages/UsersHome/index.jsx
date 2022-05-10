import ProductCard from '../../components/ProductCard'
import NavBar from '../../components/NavBar'
import SearchBar from '../../components/SearchBar'
import FilterContainer from '../../components/FilterContainer'

function UsersHome () {
  return (
    <div>
      <NavBar />
      <SearchBar />
      <ProductCard />
      <FilterContainer />
    </div>
  )
}

export default UsersHome
