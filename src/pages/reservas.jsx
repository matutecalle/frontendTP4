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

    return(
        <div className="texto">
            <h1 >Tus Reservas</h1>
            <div>
                {horariosAgrupados.map(([fecha, reservas]) => (
                    <div key={fecha}>
                        
                        <div className= "fecha card mb-3" style={{ minWidth: '900px' }}>
                            {(() => {
                                    const [year, month, day] = fecha.split('-'); // Desglosar fecha en partes
                                    const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']; // Meses abreviados
                                    const mes = meses[parseInt(month, 10) - 1]; // Convertir el número de mes a nombre
                                    const fechaFormateada = `${day} ${mes} ${year}`; // Formato personalizado
                                    return fechaFormateada;
                                })()}
                        </div> {/*eliminar este div*/}
                        <ul>
                            {reservas.map(reserva => (
                                <li key= {reserva.id}>
                                    <p>Pelicula: {reserva.Horario.Movie.nombre}</p>
                                    <img
                                        src={reserva.Horario.Movie.imgMovie}
                                        alt={reserva.Horario.Movie.nombre}
                                        className="card-img"
                                        style={{ height: '50px', objectFit: 'cover' }}
                                    />
                                    <p>Hora: {reserva.Horario.fecha.split('T')[1].slice(0,5)}</p>
                                    <p>Cantidad: {reserva.cantidad}</p>
                                </li>
                            ))}
                        </ul>
                        {/*</div>*/}
                    </div>
                ))}
            </div>
      

        </div>

    )
}