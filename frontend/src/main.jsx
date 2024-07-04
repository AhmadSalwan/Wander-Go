import React from 'react'
import ReactDOM from 'react-dom'
import Login from './Auth/Login'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css'
import Transaction from './transaction';
import App from './App';
import Confirm  from './confirm';
import Register from './Auth/Register';
import Tickets from './My_tickets';


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
  },
  {
    path:"/transaction/:flight_id",
    element:<Confirm/>
  },
  {
    path:"/register",
    element:<Register/>
  },
  {
    path:"/my_tickets",
    element:<Tickets/>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
