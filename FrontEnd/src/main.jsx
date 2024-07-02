import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import StoreProvider from './context/StoreContext.jsx'
const BASE_URL = 'http://192.168.0.104:8080/api/v1';

const contextValue = {
    setToken: null,
    setApi: BASE_URL,
    setUserInfo: null
}
ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <StoreProvider value={contextValue}>
            <App />
        </StoreProvider>
    </BrowserRouter>

)
