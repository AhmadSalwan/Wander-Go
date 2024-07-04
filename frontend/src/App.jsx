import React, { Fragment } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Login from './Auth/Login';
import Transaction from './transaction';
import './App.css';

function App() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user_id');
    navigate('/');
  };
  const toMain = () => {
    navigate('/app');
  };

  return (
    <Fragment>
      <div className="position-relative">
        <img className="img-fluid w-100 h-100" src="/image/airplaneimage.jpg" alt="Landing Page" style={{ objectFit: 'cover' }} />
        <div className="position-absolute top-0 w-100 h-100 d-flex flex-column justify-content-center align-items-center text-white" style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
          <h1 className="display-4 font-weight-bold mb-4">Welcome to</h1>
          <h1 className="display-1 font-weight-bold">WONDER GO</h1>
        </div>
        <button className="btn btn-danger position-absolute" style={{ top: '10px', right: '10px' }} onClick={handleLogout}>
          Logout
        </button>
        <button className="btn btn-success position-absolute" style={{ top: '10px', right: '100px' }} onClick={toMain}>
          Home
        </button>
      </div>
      <div className="container my-5">
        <div className="text-center mb-5">
          <a href="/transaction">
            <button className="btn btn-primary mr-2">Lihat Tiket</button>
          </a>
          <a href="/my_tickets">
            <button className="btn btn-secondary ml-2">Tiket Ku</button>
          </a>
        </div>
        <div className="row justify-content-center">
          <div className="col-12 col-md-10">
            <img className="img-fluid" src="/image/gambar.png" alt="Sulawesi Tourism" />
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
