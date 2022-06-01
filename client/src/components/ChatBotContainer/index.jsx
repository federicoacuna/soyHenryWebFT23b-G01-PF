import { useSelector } from 'react-redux'
import React, { useState } from 'react'
import ChatBot from 'react-simple-chatbot' //eslint-disable-line
import { ThemeProvider } from 'styled-components'
import chatboticon from './img/chatboticon.png'

const ChatBotContainer = () => {
  const user = useSelector(state => state.users.user)
  const [usuario, setUsuario] = useState(user.email) //eslint-disable-line

  const steps = [
    {
      id: '0',
      message: 'Bienvenido a Salchistore',

      // This calls the next id
      // i.e. id 1 in this case
      trigger: '1'
    }, {
      id: '1',

      // This message appears in
      // the bot chat bubble
      message: 'Para asesorarte mejor, cuéntame ¿Cúal es tu nombre?',
      trigger: '2'
    }, {
      id: '2',

      // Here we want the user
      // to enter input
      user: true,
      trigger: '3'
    }, {
      id: '3',
      message: ' Hola {previousValue}, ¿Cómo puedo ayudarte?',
      trigger: 4
    }, {
      id: '4',
      options: [

        // When we need to show a number of
        // options to choose we create alist
        // like this
        { value: 1, label: 'Ver métodos de pago', trigger: '5' },
        { value: 2, label: 'Ver marcas que trabajan con nosotros', trigger: '6' }

      ]
    }, {
      id: '5',
      message: 'Aceptamos Mercado Pago como medio de pago. Es rápido, seguro y no tiene costo adicional.',
      trigger: '7'
    },
    {
      id: '6',
      component: (
        <div> Trabajamos con marcas como: Dell, Asus, Logitech, Redragon, Nisuta, Samsung, iQual, HyperX, Xiaomi, y más. </div>
      ),
      trigger: '7'
    }, {
      id: '7',

      // This message appears in
      // the bot chat bubble
      message: '¿Te puedo ayudar en algo más?',
      trigger: '8'
    }, {
      id: '8',
      options: [

        // When we need to show a number of
        // options to choose we create alist
        // like this
        { value: 1, label: 'Eso es todo', trigger: '9' },
        { value: 2, label: 'Si', trigger: '4' }

      ]
    }, {
      id: '9',
      message: '¡Perfecto! Gracias por visitar Salchistore.',
      end: true
    }
  ]

  // Creating our own theme
  const theme = {
    background: '#FFFFFF',
    headerBgColor: '#333333',
    headerFontSize: '20px',
    botBubbleColor: '#0082E3',
    headerFontColor: 'white',
    botFontColor: 'white',
    userBubbleColor: '#333333',
    userFontColor: 'white'
  }

  // Set some properties of the bot
  const config = {
    botAvatar: chatboticon,
    floating: true,
    placeholder: 'Escribe un mensaje...'
  }

  return (
    <div className='App'>
      <ThemeProvider theme={theme}>
        <ChatBot
          headerTitle='Chat de Salchistore'
          steps={steps}
          {...config}
        />
      </ThemeProvider>
    </div>
  )
}

export default ChatBotContainer
