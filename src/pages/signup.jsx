import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css'

export function RegisterForm () {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [status, setStatus] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setStatus('Usuario creado con éxito');
        setFormData({ name: '', email: '', password: '' }); // Limpiar formulario
      } else {
        setStatus('Error al crear el usuario');
      }
    } catch (error) {
      setStatus('Error de conexión');
      console.error('Error:', error);
    }
  };

  return (
    <div className="container pt-5">
      <h2 className="text-center texto">Crear Usuario</h2>
      <form onSubmit={handleSubmit} className="mx-auto" style={{ maxWidth: '400px' }}>
        <div className="mb-3">
          <label className="form-label texto">Nombre:</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3 texto">
          <label className="form-label">Email:</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label texto">Contraseña:</label>
          <input
            type="password"
            name="password"
            className="form-control"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">Crear Usuario</button>
      </form>
      {status && (
        <div className={`alert mt-3 ${status.includes('éxito') ? 'alert-success' : 'alert-danger'}`} role="alert">
          {status}
          <button className='btn btn-primary' onClick={() => {navigate ('/iniciosesion')}}>Volver al inicio</button>
        </div>

      )}
    </div>
  );
};

export default RegisterForm;
