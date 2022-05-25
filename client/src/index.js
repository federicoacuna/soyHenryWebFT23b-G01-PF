import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import axios from 'axios'
import { Provider } from 'react-redux'
import store from './redux/store'
import { BrowserRouter as Router } from 'react-router-dom'
import { extendTheme, ChakraProvider } from '@chakra-ui/react'

// Setup default base url for axios requests
axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3001'

const colors = {
  primary: '#2C2C2E',
  secondary: '#E5E5EA',
  accent: '#0082E3',
  error: '#FC8181',
  success: '#38A169',
  button: '#00B5D8'
}

const theme = extendTheme({ colors })
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  // <React.StrictMode>
  <ChakraProvider theme={theme}>
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </ChakraProvider>

  // </React.StrictMode>
)
