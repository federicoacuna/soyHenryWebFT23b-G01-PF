import { Spinner } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserAddresses } from '../../redux/actions/addresses.actions'
import { setOrderAddress } from '../../redux/actions/orders.actions'
import AddressCard from '../AddressCard'

export default function AddressContainer () {
  const addresses = useSelector(state => state.addresses.data)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUserAddresses())
  }, [])//eslint-disable-line

  return (
    <>
      {Array.isArray(addresses)
        ? addresses.map(address => <AddressCard
            key={address.id}
            id={address.id}
            postalCode={address.postalCode}
            streetName={address.streetName}
            houseNumber={address.houseNumber}
            city={address.city}
            state={address.state}
            country={address.country.countryName}
            onclick={() => dispatch(setOrderAddress(address))}
                                   />
        )
        : <Spinner />}
    </>
  )
}
