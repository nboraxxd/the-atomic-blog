import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App'
import AppMemo from './App-memo'
import './style.css'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <AppMemo />
  </React.StrictMode>
)
