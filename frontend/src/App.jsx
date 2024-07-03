import { useState,useEffect } from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Login from './Auth/Login'
import Transaction from './transaction'
import './App.css'

function App() {
  return (
  <div>
    <BrowserRouter>
    <Routes>
    <Route path="/" element ={<Login/>}/>
    <Route path="/buy_ticket" element={<Transaction/>}/>
    </Routes>
    </BrowserRouter>
  </div>
  )
}

export default App
