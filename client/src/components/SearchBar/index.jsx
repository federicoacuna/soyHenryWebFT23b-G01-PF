import s from './index.module.css'

export default function SearchBar () {
  // placeholder
  return (
    <div className={s.searchBarContainer}>
      <input type='text' placeholder='start typing to search' className={s.searchBox} />
      <input type='button' value='Search' className={s.searchButton} />
    </div>
  )
}
