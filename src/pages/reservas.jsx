import { useEffect, useContext, useState } from 'react';
import { AppContext } from '../context/AppContext'; 
import '../App.css'; 

export function Reservas (){    
    const {user} = useContext(AppContext); 
    const [errorMessage, setErrorMessage] = useState('');
   // const [reservas,setReservas]= useState([]);
    const [horariosAgrupados, setHorariosAgrupados] = useState([]);

    useEffect(() => {
        console.log("nombre usuario:");
        if (user.id){
            const fetchReservas = async () =>{
                try{
                    const response = await fetch(`http://localhost:8000/api/reservations/${user.id}`,{
                        method:"GET",
                    });
                    
                    const data = await response.json();
                    console.log("datos recibidos:", data);

                    if (response.ok){
                        const agrupados = agruparReservasPorDia(data);
                        setHorariosAgrupados(agrupados);    

                    }else{
                        setErrorMessage(data.message) || console.log('No se ha podido encontrar el autor.')
                    }

                }catch(e){
                    setErrorMessage("Error de conexión con el servidor.");
                    console.error("Error de conexión:", errorMessage);
                }
            };fetchReservas();

        }else{
            setErrorMessage("Debes iniciar sesión para ver tus reservas.");
            console.log("Debes iniciar sesión para ver tus reservas.");
        }
    }, [user]);

    const agruparReservasPorDia = (reservas) => {
        const grupos = reservas.reduce((acc, reserva) => {
            // Obtener solo la fecha (sin la hora) de cada horario
            const fecha = reserva.Horario.fecha.split('T')[0]; // Esto da el formato YYYY-MM-DD
            if (!acc[fecha]) {
                acc[fecha] = [];
            }
            acc[fecha].push(reserva);
            return acc;
        },{});
        return Object.entries(grupos);
    };

    const eliminarReserva = (reserva) => {
        const fetchEliminarReserva = async () =>{
            try{
                const response = await fetch(`http://localhost:8000/api/reservations/${user.id}/${reserva.Horario.id}`,{
                    method:"DELETE",
                });
                if (response.ok) {
                    setHorariosAgrupados(prevHorarios => {
                        return prevHorarios.map(([fecha, reservasDelDia]) => {
                            if (reservasDelDia.some(r => r.id === reserva.id)) {
                                // filtramos la reserva eliminada
                                const nuevasReservas = reservasDelDia.filter(r => r.id !== reserva.id);
                                return nuevasReservas.length > 0 ?  [fecha, nuevasReservas] : null;
                            }
                            return [fecha, reservasDelDia];
                        })
                        .filter(item => item !== null); // filtra fechas sin reservas;
                    });
                    alert('Reserva eliminada con éxito');
                } else {
                    alert('Error al eliminar la reserva');
                }
            }catch (error) {
                    console.error('Error al eliminar la reserva:', error);
                    alert('Hubo un problema al eliminar la reserva');
            }
    }
    fetchEliminarReserva();
};

    return(
        <div className="texto container">
            <h1 className="mb-4">Tus Reservas</h1>
            <div>
                {horariosAgrupados.map(([fecha, reservas]) => (
                    <div key={fecha} className="mb-5">
                        <div className="card p-3 mb-3">
                            <h5 className="card-title">{
                                (() => {
                                    const [year, month, day] = fecha.split('-');
                                    const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
                                    const mes = meses[parseInt(month, 10) - 1];
                                    return `${day} ${mes} ${year}`;
                                })()
                            }</h5>
                        </div>
                        <div className="row">
                            {reservas.map((reserva, index) => (
                                <div key={reserva.id} className="col-md-4 mb-4">
                                    <div className="card h-100">
                                        <img
                                            src={reserva.Horario.Movie.imgMovie}
                                            alt={reserva.Horario.Movie.nombre}
                                            className="card-img-top"
                                            style={{ height: '200px', objectFit: 'cover' }}
                                        />
                                        <div className="card-body">
                                            <h5 className="card-title">{reserva.Horario.Movie.nombre}</h5>
                                            <p className="card-text">Cantidad asientos: {reserva.cantidad}</p>
                                            <p className="card-text">Hora: {reserva.Horario.fecha.split('T')[1].slice(0,5)}</p>
                                        </div>
                                        <div className="card-footer text-center">
                                            <button 
                                                className="btn btn-danger"
                                                onClick={() => eliminarReserva(reserva)}>                                                    Eliminar reserva
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};