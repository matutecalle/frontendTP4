import React from 'react';
import { AppContext } from '../context/AppContext'; 
import { useState, useContext } from 'react';
import '../App.css';

export function Reservar ({horario, onClose, movie}){ /*borrar luego movie como parametro*/
    const { addReservations , user} = useContext(AppContext); 
    const [cantidad, setCantidad] = useState('');
    const [status, setStatus] = useState('');

    const handleCantidad = (e) =>{
        const value = e.target.value;
        if (/^\d*$/.test(value)) { // `\d*` permite solo dígitos (incluido vacío)
            setCantidad(value);
        }
    };

    const handleReserva = async () =>{
        if(user?.id & horario.id & cantidad){
            const nuevaReserva = {
                idUser: user.id,
                idHorario: horario.id,
                cantidad: parseInt(cantidad, 10), // Asegura que la cantidad sea un número entero
            };
             //addReservations(nuevaReserva);

            try{
                const response = await fetch('http://localhost:8000/api/reservations', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(nuevaReserva),
                });
        
                if (response.ok) {
                    const data = await response.json();
                    setStatus("Reserva creada exitosamente");
                } else {
                    setStatus("Error al crear la reserva");
                }
            } catch (error) {
                console.error("Error en la solicitud:", error);
                setStatus("Error de red al crear la reserva");
            }
        }else{
            return ("falta el usuario o cantidad o id del horario");
        }
    };

    return (
        <div className="modal-overlay container">
            <div className="modal-content mini-container" >
                <h2 className='texto '>Reserva de asientos </h2>
                <h3 className='texto '>Pelicula: "{movie.nombre}"</h3>
                <h4 className='texto'>Horario {horario.fecha.split('T')[1].slice(0, 5)}</h4>
                <input 
                    type='number'
                    value={cantidad} 
                    onChange={handleCantidad}
                    placeholder="Cantidad asientos"></input>

                <button onClick={handleReserva} className="close-button">Reservar</button>
                <button onClick={onClose} className="close-button">Cerrar</button>
                
            </div>
        </div>
    );

};
export default Reservar;