import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { cleanInventory, getAllInventory, getAllStockBranch, getProductExist } from '../../redux/actions/inventories.actions'
import { useToast, EditableInput, EditablePreview, IconButton, ButtonGroup, Editable, useEditableControls, Tooltip, Select, Input, Flex, Button, Box, TableContainer, Table, TableCaption, Thead, Tr, Th, Tbody, Td, Tfoot } from '@chakra-ui/react' //eslint-disable-line

const InventoryStockBranchFilter = ({ setIsSearching, modal }) => {
  const branches = useSelector(state => state.branches.data)
  const dispatch = useDispatch()
  const [value, setValue] = useState('all')
  const [inputValue, setInputValue] = useState('')

  const handleChange = (e) => {
    setValue(e.target.value)
  }
  const handleClick = (e) => {
    if (e.target.value === 'all') dispatch(getAllInventory())
    else {
      dispatch(cleanInventory())
      dispatch(getAllStockBranch(value))
    }
  }
  const handleClean = () => {
    setIsSearching(false)
    setValue('all')
    dispatch(getAllInventory())
  }
  useEffect(() => {
    handleClean()
  }, [modal]) //eslint-disable-line

  const handleInputChange = (e) => {
    setInputValue(e.target.value)
    if (!inputValue.trim()) {
      setIsSearching(false)
    }
  }
  const handleInputSubmit = (e) => {
    e.preventDefault()
    if (!inputValue.trim()) {
      alert('ingresa nombre')
    } else {
      setIsSearching(true)
      dispatch(getProductExist({ product: inputValue }))
      setInputValue('')
    }
  }
  return (
    <>
      <form onSubmit={handleInputSubmit}>
        <Input value={inputValue} onChange={handleInputChange} placeholder='Buscar Item...' bg='white' />
      </form>
      <Select value={value} onClick={handleClick} onChange={handleChange} bg='white' w='40%'>
        <option key='all' color='black' value='all'>Todas las sucursales</option>
        {branches && branches.map(branch => (
          <option key={branch.id} color='black' value={branch.id}>({branch.id}) {branch.city}</option>
        ))}
      </Select>
      <Button onClick={handleClean} bg='primary' color='white' w='20%'>Limpiar filtros</Button>
    </>
  )
}

export default InventoryStockBranchFilter
