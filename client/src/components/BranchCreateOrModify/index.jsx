import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export default function BranchCreateorModify ({ id, state, setState, setIdBranch, branches }) {
// const branch = (id && typeof (parseInt(id)) === 'number') ? useSelector(state => state.branches).find(el => el.id === id)) : null
  const countries = useSelector(state => state.countries)
  const branch = (id && typeof (parseInt(id)) === 'number') ? branches.find(el => el.id === id) : null

  const [branchData, setbranchData] = useState({
    countryId: '',
    state: '',
    city: '',
    streetName: '',
    houseNumber: '',
    phoneNumber: ''
  })
  let [errors, setErrors] = useState({})

  useEffect(() => {
    if (branch) {
      setbranchData({
        countryId: branch.countryId,
        state: branch.state,
        city: branch.city,
        streetName: branch.streetName,
        houseNumber: branch.houseNumber,
        phoneNumber: branch.phoneNumber ? branch.phoneNumber : ''
      })
    }
  }, [])
  useEffect(() => {
    handleErrors()
  }, [branchData])

  function handleSubmit (e) {
    e.preventDefault()
    console.log(branchData)
  }

  function handleChange (e) {
    if (e.target.name === 'countryId') {
      setbranchData({ ...branchData, [e.target.name]: parseInt(e.target.value) })
    } else {
      setbranchData({ ...branchData, [e.target.name]: e.target.value })
    }
  }

  function handleErrors () {
    errors = {}
    if (!branchData.state) { errors.state = 'Inserte un Estado' } else if (!/^[a-zA-Z\s]*$/.test(branchData.state)) { errors.state = 'Solamente puede contener letras' } else if (branchData.state.charAt(0) === ' ') { errors.state = 'El primer caracter no puede ser un espacio vacio' } else if (branchData.state.length > 40) { errors.state = 'Maximo 40 caracteres' }

    if (!branchData.city) { errors.city = 'Inserte una Ciudad' } else if (!/^[a-zA-Z\s]*$/.test(branchData.city)) { errors.city = 'Solamente puede contener letras' } else if (branchData.city.charAt(0) === ' ') { errors.city = 'El primer caracter no puede ser un espacio vacio' } else if (branchData.city.length > 40) { errors.city = 'Maximo 40 caracteres' }

    if (!branchData.streetName) { errors.streetName = 'Inserte una Calle' } else if (!/^[a-zA-Z\s]*$/.test(branchData.streetName)) { errors.streetName = 'Solamente puede contener letras' } else if (branchData.streetName.charAt(0) === ' ') { errors.streetName = 'El primer caracter no puede ser un espacio vacio' } else if (branchData.streetName.length > 20) { errors.streetName = 'Maximo 40 caracteres' }
    if (!branchData.houseNumber) { errors.houseNumber = 'Inserte un Numero' } else if (/[^0-9]/.test(branchData.houseNumber)) { errors.houseNumber = 'Solamente puede insertar numeros' } else if (branchData.houseNumber.length > 40) { errors.houseNumber = 'Maximo 40 digitos' }
    if (!branchData.phoneNumber) { errors.phoneNumber = 'Inserte un Numero' } else if (/[^0-9]/.test(branchData.phoneNumber)) { errors.phoneNumber = 'Solamente puede insertar numeros' } else if (branchData.phoneNumber.length > 35) { errors.phoneNumber = 'Maximo 35 digitos' }
    if (!branchData.countryId) { errors.countryId = 'Inserte un País' }

    setErrors(errors)
    return errors
  }

  return (
    <div>
      <h1>Datos de la Sucursal</h1>
      <form onSubmit={handleSubmit}>

        <p>
          <label>Seleccione un País</label>
          <select onChange={handleChange} name='countryId'>
            {countries
              ? countries.map((el, i) =>
                <option key={i} value={el.id}>{el.countryName}</option>)
              : <option>'Lista de países no encontrada'</option>}
          </select>
          <label>{errors.countryId}</label>
        </p>
        <label>Estado</label>
        <p>
          <input onChange={handleChange} type='text' name='state' value={branchData.state} />
          <label>{errors.state}</label>
        </p>
        <label>Ciudad</label>
        <p>
          <input onChange={handleChange} type='text' name='city' value={branchData.city} />
          <label>{errors.city}</label>
        </p>
        <label>Calle</label>
        <p>
          <input onChange={handleChange} type='text' name='streetName' value={branchData.streetName} />
          <label>{errors.streetName}</label>
        </p>
        <label>Numero</label>
        <p>
          <input onChange={handleChange} type='text' name='houseNumber' value={branchData.houseNumber} />
          <label>{errors.houseNumber}</label>
        </p>
        <label>Numero de Contacto</label>
        <p>
          <input onChange={handleChange} type='text' name='phoneNumber' value={branchData.phoneNumber} />
          <label>{errors.phoneNumber}</label>
        </p>
        <input type='submit' />
      </form>
      <button onClickCapture={() => { setState(false); setIdBranch('') }}>CANCELAR</button>
    </div>

  )
}
