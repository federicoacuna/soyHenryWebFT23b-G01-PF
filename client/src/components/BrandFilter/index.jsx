/* import axios from 'axios' */
/* import { useState, useEffect } from 'react' */
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addFilterParam } from '../../redux/actions'

export default function BrandFilter () {
  const placeholder = 'Select a brand'
  const arrayBrands = [{ value: 'Samsung', label: 'Samsung' }, { value: 'Lenovo', label: 'Lenovo' },
    { value: 'DELL', label: 'DELL' }, { value: 'MSI', label: 'MSI' }, { value: 'Asus', label: 'Asus' },
    { value: 'Razer', label: 'Razer' }]
  const [brand, setBrand] = useState({ selectedBrand: [] })
  /*   const [allBrands, setAllBrands] = useState({ existingBrands: [] }) */
  const dispatch = useDispatch()

  /* useEffect(() => {
    async function axiosBrands () {
      // EL BACK debería devolver un arreglo con el formato [{ value: 'marca1', label 'marca1' }, { value: 'marca2', label: 'marca2'} ]
      const allBrands = await axios.get('/products?brand=all')
      setAllBrands(brands => ({ ...brands, existingBrands: allBrands }))
    }
    axiosBrands()
  })
  */

  const onChange = function (selected) {
    if (brand.selectedBrand.includes(selected.target.value)) {
      const position = brand.selectedBrand.indexOf(selected.target.value)
      const actual = brand.selectedBrand
      actual.splice(position, 1)
      setBrand(brand => ({ ...brand, selectedBrand: actual }))
    } else {
      setBrand(brand => ({ ...brand, selectedBrand: brand.selectedBrand.concat(selected.target.value) }))
    }
  }

  const handleSubmit = function (e) {
    e.preventDefault()

    /* brand.selectedBrand = [LG, Samsung, DELL] ó [LG] */
    const sendBrand = brand.selectedBrand.join(', ')
    const options = { brand: sendBrand }
    dispatch(addFilterParam(options))

    setBrand({ selectedBrand: [] })
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <div className=''>{placeholder}</div>
      <select className='' multiple name={placeholder} value={brand.selectedBrand.length > 0 ? brand.selectedBrand : placeholder} onChange={() => {}}>
        {/* {allBrands.map(brand => <option key={brand.value} value={brand.value} onClick={onChange}>{brand.label}</option>)} */}
        {arrayBrands.map(brand => <option key={brand.value} value={brand.value} onClick={onChange}>{brand.label}</option>)}
      </select>
      <input className='' type='submit' value='GET' />
    </form>
  )
}
