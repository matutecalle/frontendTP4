import React from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

export default function Navbar() {
    const navigate=useNavigate();
    const { loginUser,user } = useContext(AppContext);
    function desloguear(){
        loginUser(null);
        navigate('/iniciosesion');
    }


  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid position-relative">
        <a className="navbar-brand" href="#">CineMatic</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <span className="navbar-text position-absolute start-50 translate-middle-x">Bienvenido {user? user.name : "invitado"} </span>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link active " href='#' aria-current="page" onClick={() => { navigate('/') }}>Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href='#' aria-current="page" onClick={() => { navigate('/reservas') }}>Mis reservas</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href='#' onClick={() => desloguear()}>Log Out</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
