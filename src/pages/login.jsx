import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext'; 
import 'bootstrap/dist/css/bootstrap.min.css';

export function LoginForm() {
    const { loginUser, user } = useContext(AppContext);  // Accede al contexto de autenticación
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMessage('');

        try {
            // Enviar datos de login a la API
            const loginResponse = await fetch("http://localhost:8000/api/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const loginResult = await loginResponse.json();

            if (loginResponse.ok) {
                loginUser(loginResult.user);  // Guardar el usuario en el contexto
            } else {
                setErrorMessage(loginResult.message || "Error en el inicio de sesión.");
            }
        } catch (error) {
            setErrorMessage("Error de conexión con el servidor.");
            console.error("Error de conexión:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container mt-5" style={{ maxWidth: "400px" }}>
            {user ? (
                <div className="text-center">
                    <h3>Bienvenido, {user.name}</h3>
                    <button
                        className="btn btn-secondary mt-3"
                        onClick={() => {
                            loginUser(null);  // Limpiar el usuario al hacer logout
                        }}
                    >
                        Cerrar Sesión
                    </button>
                </div>
            ) : (
                <div>
                    <h2 className="text-center mb-4">Iniciar Sesión</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Correo:</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="form-control"
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Contraseña:</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="form-control"
                            />
                        </div>
                        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                        <button type="submit" className="btn btn-primary w-100" disabled={isLoading}>
                            {isLoading ? "Cargando..." : "Iniciar Sesión"}
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default LoginForm;
