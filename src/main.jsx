import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import ContextProvider from './Components/ContextProvider.jsx'
import { Provider } from 'react-redux'

import store from './store/store.js'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ContextProvider>
      <Provider store={store}>
    <App />
    </Provider>
    </ContextProvider>
  </React.StrictMode>,
)
