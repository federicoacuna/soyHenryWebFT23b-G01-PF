import styles from './SearchBar.module.css'

export default function SearchBar () {
  // placeholder
  return (
    <div className={styles.searchBarContainer}>
      <input type='text' placeholder='start typing to search' className={styles.searchBox} />
      <input type='button' value='Search' className={styles.searchButton} />
    </div>
  )
}
