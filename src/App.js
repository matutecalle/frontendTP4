import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Form } from 'react-router-dom';
import { LoginForm } from './pages/login';
import RegisterForm from './pages/signup';
import { Principal } from './pages/home';
import { PagPelicula } from './pages/movie';
import { Reservas } from './pages/reservas';

function App() {
  return (
    <Router>
      <div className='fondo'>
        <Routes>
          <Route path="/InicioSesion" element={<LoginForm />} />
          <Route path="/Registrar" element={<RegisterForm />} />
          <Route path="/" element={<Principal />} />
          <Route path="/Pelicula" element={<PagPelicula />} /> 
          <Route path="/reservas" element={<Reservas />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;