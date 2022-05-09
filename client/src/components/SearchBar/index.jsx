import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { getProducts } from '../../redux/actions/index'
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
      dispatch(getProducts(item))
      setItem('')
    }
  }

  return (
    <div className={styles.searchBarContainer}>
      <input
        type='text' placeholder='start typing to search' className={styles.searchBox}
        value={item}
        onKeyPress={e => e.key === 'Enter' && handleSubmit(e)}
        onChange={e => handleInputChange(e)}
      />
      <input type='button' value='Search' className={styles.searchButton} />
    </div>
  )
}
