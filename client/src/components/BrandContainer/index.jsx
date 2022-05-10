/* import axios from 'axios' */
/* import { useState, useEffect } from 'react' */
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { getProducts } from '../../redux/actions'

export default function BrandContainer () {
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
    let URLsection = ''; let sendURL = ''

    /* brands.selectedBrands = [LG, Samsung, DELL] ó [LG] */
    for (let i = 0; i < brand.length; i++) {
      URLsection += `brand${i + 1}=${brand[i]}&`
    }

    sendURL = URLsection.slice(0, -1)
    /* MODIFICAR ACTIONS para que reciban argumentos y modifiquen la URL que llaman??? */
    dispatch(getProducts(`?${sendURL}`)) /* Este dispatch debería modifica el state que muestra lo filtrado en Redux-Store y se actualiza lo mostrado */

    setBrand({ selectedBrand: [] })
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <div className=''>
        <div className=''>
          <div className=''>{placeholder}</div>
          <select className='' multiple name={placeholder} value={brand.selectedBrand.length > 0 ? brand.selectedBrand : placeholder} onChange={() => {}}>
            {/* {allBrands.map(brand => <option key={brand.value} value={brand.value} onClick={onChange}>{brand.label}</option>)} */}
            {arrayBrands.map(brand => <option key={brand.value} value={brand.value} onClick={onChange}>{brand.label}</option>)}
          </select>
        </div>
        <input className='' type='submit' value='GET' />
      </div>
    </form>
  )
}
