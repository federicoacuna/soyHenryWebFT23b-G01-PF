import s from './index.module.css'
export default function BranchCard ({ state, city, streetName, houseNumber, phoneNumber, id, setIdBranch }) {
  return (
    <div className={s.container}>
      <p>Estado:{state}</p>
      <p>Ciudad:{city} </p>
      <p>Calle:{streetName}</p>
      <p>Numero:{houseNumber}</p>
      <p>Telefono: {phoneNumber}</p>
      <button onClick={() => setIdBranch(id)}>Seleccionar</button>
    </div>

  )
}
