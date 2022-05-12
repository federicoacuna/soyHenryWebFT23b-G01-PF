import { useState } from 'react'
/* import { useDispatch } from 'react-redux'
import { addFilterParam } from '../../redux/actions' */

export default function SortByPrice () {
  const placeholder = 'Sort by price'
  const sortOps = [{ value: 'Min Price', label: 'Min Price' }, { value: 'Max Price', label: 'Max Price' }]

  const [sort, setSort] = useState({ sortPrice: null })
  /* const dispatch = useDispatch() */

  const onChange = function (selection) { setSort({ sortPrice: selection.target.value }) }
  const handleSubmit = function (e) {
    e.preventDefault()
    const sortType = sort.sortPrice === null ? 'Min-Price' : sort.sortPrice
    const options = { sort: sortType }
    console.log(options) // DELETE this row !!!
    /* dispatch(addFilterParam(options)) */

    setSort({ sortPrice: null })
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <span className=''>{placeholder}</span>
      <select className='' multiple={false} name={placeholder} value={sort.sortPrice ? sort.sortPrice : placeholder} onChange={onChange}>
        {sortOps.map(op => <option key={op.value} value={op.value}>{op.label}</option>)}
      </select>
      <input className='' type='submit' value='GET' />
    </form>
  )
}
