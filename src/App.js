import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { LoginForm } from './pages/login';
import RegisterForm from './pages/signup';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/InicioSesion" element={<LoginForm />} />
          <Route path="/Registrar" element={<RegisterForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;