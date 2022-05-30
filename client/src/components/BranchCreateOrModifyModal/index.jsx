import { useEffect, useState } from 'react'
import { Input, FormControl, FormLabel, Select } from '@chakra-ui/react'
import { updateBranch, createNewBranch } from '../../redux/actions/branches.actions'
import { useDispatch } from 'react-redux'

export default function BranchCreateorModify ({ branch, countries }) {
  const dispatch = useDispatch()
  const [branchData, setbranchData] = useState({
    countryId: '',
    state: '',
    city: '',
    streetName: '',
    houseNumber: '',
    phoneNumber: '',
    id: ''
  })
  let [errors, setErrors] = useState({})

  useEffect(() => {
    if (branch.id) {
      setbranchData({
        countryId: branch.countryId,
        state: branch.state,
        city: branch.city,
        streetName: branch.streetName,
        houseNumber: branch.houseNumber,
        phoneNumber: branch.phoneNumber ? branch.phoneNumber : '',
        id: branch.id
      })
    }
  }, [])
  useEffect(() => {
    handleErrors()
  }, [branchData])

  function handleSubmit (e, branchData, branch) {
    e.preventDefault()
    if (Object.values(branch).length === 0) { dispatch(createNewBranch(branchData)) } else { dispatch(updateBranch(branchData)) }
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

    if (!branchData.streetName) { errors.streetName = 'Inserte una Calle' } else if (!/^[a-zA-Z0-9\s-/]*$/.test(branchData.streetName)) { errors.streetName = 'Puede contener numeros letras o  "-" , "/" ' } else if (branchData.streetName.charAt(0) === ' ') { errors.streetName = 'El primer caracter no puede ser un espacio vacio' } else if (branchData.streetName.length > 20) { errors.streetName = 'Maximo 40 caracteres' }
    if (!branchData.houseNumber) { errors.houseNumber = 'Inserte un Numero' } else if (!/^[a-zA-Z0-9\s-/]*$/.test(branchData.houseNumber)) { errors.houseNumber = 'Puede contener numeros letras o  "-" , "/" ' } else if (branchData.houseNumber.charAt(0) === ' ') { errors.houseNumber = 'El primer caracter no puede ser un espacio vacio' } else if (branchData.houseNumber.length > 40) { errors.houseNumber = 'Maximo 40 digitos' }
    if (!branchData.phoneNumber) { errors.phoneNumber = 'Inserte un Numero' } else if (/[^0-9]/.test(branchData.phoneNumber)) { errors.phoneNumber = 'Solamente puede insertar numeros' } else if (branchData.phoneNumber.length > 35) { errors.phoneNumber = 'Maximo 35 digitos' }
    if (!branchData.countryId) { errors.countryId = 'Inserte un País' }

    setErrors(errors)
    return errors
  }

  return (
    <form onSubmit={(e) => handleSubmit(e, branchData, branch)}>
      <FormControl>

        <p>
          <FormLabel>Seleccione un País</FormLabel>
          <Select onChange={handleChange} name='countryId' placeholder='Seleccione un pais'>
            {countries
              ? countries.map((el, i) =>
                <option key={i} value={el.id}>{el.countryName}</option>)
              : <option>'Lista de países no encontrada'</option>}
          </Select>
          <FormLabel>{errors.countryId}</FormLabel>
        </p>
        <FormLabel>Estado</FormLabel>
        <p>
          <Input onChange={handleChange} type='text' name='state' value={branchData.state} />
          <FormLabel>{errors.state}</FormLabel>
        </p>
        <FormLabel>Ciudad</FormLabel>
        <p>
          <Input onChange={handleChange} type='text' name='city' value={branchData.city} />
          <FormLabel>{errors.city}</FormLabel>
        </p>
        <FormLabel>Calle</FormLabel>
        <p>
          <Input onChange={handleChange} type='text' name='streetName' value={branchData.streetName} />
          <FormLabel>{errors.streetName}</FormLabel>
        </p>
        <FormLabel>Numero</FormLabel>
        <p>
          <Input onChange={handleChange} type='text' name='houseNumber' value={branchData.houseNumber} />
          <FormLabel>{errors.houseNumber}</FormLabel>
        </p>
        <FormLabel>Numero de Contacto</FormLabel>
        <p>
          <Input onChange={handleChange} type='text' name='phoneNumber' value={branchData.phoneNumber} />
          <FormLabel>{errors.phoneNumber}</FormLabel>
        </p>
        <Input bg='teal' fontWeight='700' type='submit' value={Object.values(branch).length === 0 ? 'Crear Surcursal' : 'Modificar Sucursal'} disabled={Object.values(errors).length > 0} />
      </FormControl>
    </form>

  )
}
