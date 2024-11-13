import React, { createContext, useState } from 'react';

// 1. Crear el Context
export const AppContext = createContext();

// 2. Crear el Provider
export const AppProvider = ({ children }) => {
    // 3. Define el estado global
    const [user, setUser] = useState(null); // Ejemplo de estado para datos del usuario
    const [movies, setMovies] = useState([]); 
    const [reservations, setReservations] = useState([]); // Ejemplo de estado para reservas

    // 4. Define funciones que manejen el estado global
    const loginUser = (userData) => {
        setUser(userData);
    };

    const logoutUser = () => {
        setUser(null);
    };

    const addReservation = (reservation) => {
        setReservations([...reservations, reservation]);
    };

    const removeReservation = (id) => {
        setReservations(reservations.filter(res => res.id !== id));
    };

    const fetchReservations = async () => {
        try {
            const response = await fetch('localhost:8000/api/');
            const data = await response.json();
            setReservations(data);
        } catch (error) {
            console.error('Error al obtener reservas:', error);
        }
    };
    
    // 5. Proveer el estado y funciones a los componentes hijos
    return (
        <AppContext.Provider
            value={{
                user,
                loginUser,
                logoutUser,
                reservations,
                addReservation,
                removeReservation,
                fetchReservations,
                movies,
                setMovies
            }}
        >
            {children}
        </AppContext.Provider>
    );
};