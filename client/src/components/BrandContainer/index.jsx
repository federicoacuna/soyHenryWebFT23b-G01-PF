const brands = [{ value: 'Samsung', label: 'Samsung' }, { value: 'Lenovo', label: 'Lenovo' }]
const placeholder = ['Marcas', 'Otros']

export default function BrandContainer ({ brands, placeholder, onChange, handleSubmit }) {
  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <div className=''>
        <div className=''>
          <select className='' multiple name={placeholder} value={placeholder} onChange={onChange}>
            <option value={placeholder}>{placeholder}</option>
            {brands.map(brand => <option key={brand.value} value={brand.value}>{brand.label}</option>)}
          </select>
        </div>
        <input className='' type='submit' value='GET' />
      </div>
    </form>
  )
}
