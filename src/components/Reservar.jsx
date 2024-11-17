import React from 'react';
import { AppContext } from '../context/AppContext'; 
import { useState, useContext } from 'react';
import '../App.css';

export function Reservar ({horario, onClose, movie}){ /*borrar luego movie como parametro*/
    const { addReservations , user} = useContext(AppContext); 
    const [cantidad, setCantidad] = useState('');
    const [status, setStatus] = useState('');
    const[successMessage, setSuccessMessage] = useState('');

    const handleCantidad = (e) =>{
        const value = e.target.value;
        if (/^\d*$/.test(value)) { // `\d*` permite solo dígitos (incluido vacío)
            setCantidad(value);
        }
    };

    const handleReserva = async () =>{
        console.log("cant asientos:", cantidad);
        console.log ("user:", user);
        console.log( "horario:", horario.id) ;
        
        const cantidadNumero = parseInt(cantidad, 10);

        // si `cantidad` es mayor a cero, entera y no tiene decimales
        if (isNaN(cantidadNumero) || cantidadNumero <= 0 || !Number.isInteger(cantidadNumero)) {
            alert("La cantidad debe ser un número entero mayor a cero sin decimales");
        }else{
            if( user.id && horario.id && cantidad){
                
                try{
                    const reservaYaExiste = await fetch (`http://localhost:8000/api/reservations/${user.id}/${horario.id}`,{
                        method:"GET",
                    });
                    const reservaExistente = await reservaYaExiste.json();
                    console.log("reserva encontrada:", reservaExistente);
                    if (reservaExistente){//verifico si ya existe reserva de ese horario

                        const cantidadActualizada = reservaExistente.cantidad + cantidadNumero
                        const actualizarCantidad =  await fetch(`http://localhost:8000/api/reservations/${user.id}/${reservaExistente.idHorario}`,
                            {
                                method: 'PUT',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({ cantidad: cantidadActualizada }),
                            }
                        );
        
                        if (actualizarCantidad.ok) {
                            setSuccessMessage("Reserva actualizada exitosamente 👌");
                        } else {
                            setStatus("Error al actualizar la reserva");
                        }
                    }else{

                        const nuevaReserva = {
                            idUser: user.id,
                            idHorario: horario.id,
                            cantidad: cantidadNumero, // Asegura que la cantidad sea un número entero
                        };
                        try{
                            console.log("Datos a guardar", nuevaReserva);
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
                                console.log("Reserva creada exitosamente",status);
                                setSuccessMessage("Reserva creada exitosamente 👌");  // Muestra el mensaje de éxito
                                setStatus(''); // Limpia cualquier mensaje de error
                                setTimeout(() => setSuccessMessage(''), 5000); // Oculta el mensaje después de 3 segundos
        
                            } else {
                                alert("Error al crear la reserva");
                            }
                        } catch (error) {
                            alert("Error al conectar con el servidor", error);
                        }
                    }    
                } catch (error) {
                    console.error("Error en la solicitud:", error);
                    setStatus("Error de red al crear la reserva");
                }


                ////////////////////////////////
               
            }else{
                alert("Verifique que haya ingresado con un usuario, que haya seleccionado un horario y una cantidad correcta")
            }
        }


        
    };

    return (
        <div className="modal-overlay container">
            <div className="modal-content mini-container" >
                <h2 className='texto '>Reserva de asientos </h2>
                {successMessage && <div className="success-alert success-msg">{successMessage}</div>} 
                <h3 className='texto '>Pelicula: "{movie.nombre}"</h3>
                <h4 className='texto'>Horario {horario.fecha.split('T')[1].slice(0, 5)}</h4>
                <input 
                    type='number'
                    value={cantidad} 
                    onChange={handleCantidad}
                    placeholder="Cantidad asientos"></input>

                {/*<button onClick={handleReserva} className="close-button">Reservar</button>*/}
                <button onClick={() => { console.log("Botón reserva clickeado"); handleReserva(); }} className="close-button">
                    Reservar
                </button>
                <button onClick={onClose} className="close-button">Cerrar</button>
                
            </div>
        </div>
    );

};
export default Reservar;