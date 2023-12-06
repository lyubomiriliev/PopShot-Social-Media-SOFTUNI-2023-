import { BrowserRouter } from 'react-router-dom'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import "../src/assets/styles/style.scss";

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
)
