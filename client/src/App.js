import './App.css'
import { Route, Routes } from 'react-router-dom'
import UsersHome from './pages/UsersHome'

function App () {
  return (
    <div>
      <Routes>
        <Route path='/' element={<UsersHome />} />
      </Routes>
    </div>
  )
}

export default App
