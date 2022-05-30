import BranchCard from '../BanchCard'
import BranchCreateOrModify from '../BranchCreateOrModifyModal'
import { useState } from 'react'
import s from './index.module.css'
// import { useDispatch } from 'react-redux'
// import { useSelector } from 'react-redux'

export default function BranchContainer () {
  // const dispatch = useDispatch()
  // const branches=useSelector(state=>state.branches)
  const branches = [{
    id: 1,
    state: 'Corrientes',
    city: 'Corrientes',
    streetName: 'San Martin',
    houseNumber: '5499',
    countryId: 1,
    phoneNumber: '12412412'

  },
  {
    id: 2,
    state: 'Perugorria',
    city: 'Cochinilla',
    streetName: 'Puerto Madero',
    houseNumber: '42069',
    countryId: 2,
    phoneNumber: '14124124'

  },
  {
    id: 3,
    state: 'West Virginia',
    city: 'Snowshoe Village',
    streetName: 'Main St.',
    houseNumber: '42069',
    countryId: 5,
    phoneNumber: '124124124'

  }]
  const [idBranch, setIdBranch] = useState('')
  const [state, setState] = useState(false)

  function handleClick (e) {
    if (e.target.name === 'add') {
      setIdBranch('add')
      setState(true)
      // selecciono--->me guarda id en un state---> me lleva a branch create y le pasa el id por prop
    } else if (e.target.name === 'modify') {
      setState(true)
      // selecciono--->me guarda id en un state---> me lleva a branch create y le pasa el id por prop
      // dispatch(removeBranch(idBranch))
    } else if (e.target.name === 'delete') {
      if (idBranch && typeof (parseInt(idBranch)) === 'number') {
        console.log('ELIMINADO')
        setIdBranch('')
        // dispatch(removeBranch(idBranch))
      } else {
        console.log('SELECCIONE UNA BRANCH PARA SER ELIMINADA')
      }
      // selecciono--->me guarda id en un state---> despacha accion para eliminar
      // dispatch(removeBranch(idBranch))
    }
  }

  return (
    <div className={s.container}>
      <div>
        {branches
          ? branches.map((el, i) =>

            <BranchCard setIdBranch={setIdBranch} key={i} state={el.state} city={el.city} streetName={el.streetName} houseNumber={el.houseNumber} id={el.id} phoneNumber={el.phoneNumber} />
          )
          : 'Aún no hay Sucursales agregadas'}
      </div>
      <div>
        <button onClick={handleClick} name='add'>Crear Sucursal</button>
        <button onClick={handleClick} name='modify'>Modificar</button>
        <button onClick={handleClick} name='delete'>Eliminar</button>
      </div>
      <div>
        {(state) && (idBranch === 'add' || typeof (idBranch) === 'number')
          ? <BranchCreateOrModify id={idBranch} setState={setState} setIdBranch={setIdBranch} state={state} branches={branches} />
          : ''}
      </div>
    </div>

  )
}
