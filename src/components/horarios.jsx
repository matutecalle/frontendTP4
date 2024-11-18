import { useEffect, useState } from 'react';
import Reservar from './Reservar';
import { Col, Row, Container} from 'react-bootstrap';


export function Horarios({movie, movieId}){
    
    const [horarios,setHorarios]= useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [horariosAgrupados, setHorariosAgrupados] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedHorario, setSelectedHorario] = useState(null);
 
    useEffect(() => {
        console.log("el id recibido a horarios es:", movieId);
        if (movieId){
            const fetchHorarios = async () =>{
                try{
                    const response = await fetch(`http://localhost:8000/api/horarios/pelicula/${movieId}`,{
                        method:"GET",
                    });
                    
                    const data = await response.json();
                    console.log("datos recibidos:", data);

                    if (response.ok){
                        setHorarios(data);
                    }else{
                        setErrorMessage(data.message) || console.log('No se ha podido encontrar el autor.')
                    }

                }catch(e){
                    setErrorMessage("Error de conexión con el servidor.");
                    console.error("Error de conexión:", errorMessage);
                }
            };fetchHorarios();
        }
    }, [movieId]);

    useEffect(() => {
            if (horarios && horarios.length > 0) {
                agruparHorariosPorDia(horarios);
            }
            }, [horarios]);

    const agruparHorariosPorDia = (horarios) => {
        const grupos = horarios.reduce((acc, horario) => {
            // Obtener solo la fecha (sin la hora) de cada horario
            const fecha = horario.fecha.split('T')[0]; // Esto da el formato YYYY-MM-DD
            if (!acc[fecha]) {
                acc[fecha] = [];
            }
            acc[fecha].push(horario);
            return acc;
        }, {});

        // Convertir el objeto de grupos a un array de días y horarios
        setHorariosAgrupados(Object.entries(grupos));
    };

    const manejarReserva = (horario) => {
        console.log("horario elegido:",horario);
        setSelectedHorario(horario);
        setModalOpen(true);
    };

    const cerrarModal = () => {
        setModalOpen(false);
        setSelectedHorario(null);
    };

    return (
        <Container>
            <Row>
                {horariosAgrupados.length > 0 ? (
                    horariosAgrupados.map(([fecha, horariosDelDia]) => (
                        <Col md={6} key={fecha} className="mb-4">   
                            <div style={styles.diaContainer}>
                                {/* Mostrar la fecha solo una vez por día */}
                                <div style={styles.fecha}>
                                    {(() => {
                                        const [year, month, day] = fecha.split('-'); // Desglosar fecha en partes
                                        const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']; // Meses abreviados
                                        const mes = meses[parseInt(month, 10) - 1]; // Convertir el número de mes a nombre
                                        return `${day} ${mes} ${year}`; // Formato personalizado
                                    })()}
                                </div>
    
                                {/* Mostrar los horarios dentro de 3 columnas */}
                                <Row>
                                    {horariosDelDia.map((horario, index) => {
                                        // Agrupar los horarios en 3 columnas
                                        if (index % 3 === 0 && index !== 0) {
                                            return (
                                                <Col key={horario.id} md={4} className="mb-2">
                                                    <button
                                                        style={styles.horario}
                                                        onClick={() => manejarReserva(horario)}
                                                        className="horario-button"
                                                    >
                                                        {horario.fecha.split('T')[1].slice(0, 5)} {/* Muestra solo hora:minutos */}
                                                    </button>
                                                </Col>
                                            );
                                        }
                                        return (
                                            <Col key={horario.id} md={4} className="mb-2">
                                                <button
                                                    style={styles.horario}
                                                    onClick={() => manejarReserva(horario)}
                                                    className="horario-button"
                                                >
                                                    {horario.fecha.split('T')[1].slice(0, 5)} {/* Muestra solo hora:minutos */}
                                                </button>
                                            </Col>
                                        );
                                    })}
                                </Row>
                            </div> 
                        </Col>
                    ))
                ) : (
                    <p className="texto">No hay horarios disponibles.</p>
                )}
            </Row>
    
            {isModalOpen && (
                <Reservar horario={selectedHorario} onClose={cerrarModal} movie={movie} />
            )}
        </Container>
    );
    
};

const styles = {
    diaContainer: {
        border: '1px solid #ddd',
        borderRadius: '8px',
        marginBottom: '16px',
        padding: '16px',
    },
    fecha: {
        fontSize: '18px',
        fontWeight: 'bold',
        marginBottom: '8px',
        textAlign: 'center',
        backgroundColor: '#f2f2f2',
        padding: '8px',
        borderRadius: '4px',
    },
    horarios: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    horario: {
        margin: '5px 10px',
        padding: '10px',
        backgroundColor: '#e0e0e0',
        borderRadius: '5px',
        textAlign: 'center',
        width: '80px',
        fontWeight: 'bold',
    },
};


export default Horarios;