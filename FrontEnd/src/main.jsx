import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import ApiContext from './context/Apicontext.jsx'

const BASE_URL = 'http://localhost:8080/api/v1';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ApiContext.Provider value={BASE_URL}>
      <App />
    </ApiContext.Provider>
  </BrowserRouter>

)
