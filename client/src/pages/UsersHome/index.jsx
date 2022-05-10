import ProductCard from '../../components/ProductCard'
import NavBar from '../../components/NavBar'
import SearchBar from '../../components/SearchBar'
import BrandContainer from '../../components/BrandContainer'

function UsersHome () {
  return (
    <div>
      <NavBar />
      <SearchBar />
      <ProductCard />
      <BrandContainer />
    </div>
  )
}

export default UsersHome
