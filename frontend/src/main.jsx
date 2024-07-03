import React from 'react'
import ReactDOM from 'react-dom'
import Login from './Auth/Login'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css'
import Transaction from './transaction';
import App from './App';

const router = createBrowserRouter([
  {
    path:'/',
    element:<Login/>
  },
  {
    path:'/transaction',
    element:<Transaction/>
  },
  {
    path:'/app',
    element:<App/>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
