import BranchCard from '../BanchCard'
import BranchCreateOrModify from '../BranchCreateOrModifyModal'
import { useState } from 'react'
// import s from './index.module.css'
import { Text, Button, Flex, useToast, RadioGroup, Radio, Stack, Box, Divider } from '@chakra-ui/react' //eslint-disable-line

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

  // eslint-disable-next-line
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
    <Flex flexDirection='column'>
      <div>
        {branches
          ? branches.map((el, i) =>

            <BranchCard setIdBranch={setIdBranch} key={i} idBranch={idBranch} state={el.state} city={el.city} streetName={el.streetName} houseNumber={el.houseNumber} id={el.id} phoneNumber={el.phoneNumber} />
          )
          : 'Aún no hay Sucursales agregadas'}
      </div>
      {/* <Flex mt='1.5rem'>
        <Button _hover={{ bg: 'none' }} border='2px' borderColor='accent' color='accent' bg='white' mr='1rem' borderRadius='none' onClick={handleClick} name='add'>Crear Sucursal</Button>
        <Button _hover={{ bg: 'none' }} border='2px' borderColor='accent' color='accent' bg='white' mr='1rem' borderRadius='none' onClick={handleClick} name='modify'>Modificar</Button>
        <Button _hover={{ bg: 'none' }} border='2px' borderColor='accent' color='accent' bg='white' borderRadius='none' onClick={handleClick} name='delete'>Eliminar</Button>
      </Flex> */}
      <div>
        {(state) && (idBranch === 'add' || typeof (idBranch) === 'number')
          ? <BranchCreateOrModify id={idBranch} setState={setState} setIdBranch={setIdBranch} state={state} branches={branches} />
          : ''}
      </div>
    </Flex>

  )
}
