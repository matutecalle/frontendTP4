import '../App.css'
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext'; 
import { Horarios } from '../components/horarios';
import { Container, Row, Col } from 'react-bootstrap';


export function PagPelicula(){
    const { selectedMovie/*, addReservation, user*/ } = useContext(AppContext); 
    const [movieAuthor, setMovieAuthor] = useState(null)
    const [movieCategory, setMovieCategory] = useState(null)
    const [errorMessage, setErrorMessage] = useState('');

    /*const handleReserva = () =>{
        addReservation(user.idUser, idHorario, cantidad)
    }*/

    useEffect(() =>{
        console.log(selectedMovie?.idAutor);
        if (selectedMovie){
            const fetchAuthor = async () =>{
                try{
                    const response = await fetch(`http://localhost:8000/api/authors/${selectedMovie.idAutor}`,{
                        method:"GET",
                    });
                    
                    const data = await response.json();

                    if (response.ok){
                        setMovieAuthor(data);
                    }else{
                        setErrorMessage(data.message) || console.log('No se ha podido encontrar el autor.')
                    }

                }catch(e){
                    setErrorMessage("Error de conexión con el servidor.");
                    console.error("Error de conexión:", errorMessage);
                }
            };fetchAuthor();

            const fetchCategory = async () =>{
                try{
                    const response = await fetch(`http://localhost:8000/api/categories/${selectedMovie.idCategoria}`,{
                        method:"GET",
                    });
                    
                    const data = await response.json();

                    if (response.ok){
                        setMovieCategory(data);
                    }else{
                        setErrorMessage(data.message) || console.log('No se ha podido encontrar el autor.')
                    }

                }catch(e){
                    setErrorMessage("Error de conexión con el servidor.");
                    console.error("Error de conexión:", errorMessage);
                }
            };fetchCategory();
            console.log(movieCategory);

            
        }
    },[selectedMovie]);
    console.log("el id de la pelicula es:",selectedMovie.id);
    return(
        
            <Container>
                <Row>
                    <h1 className='texto mb-4 centrar' >{selectedMovie?.nombre}</h1>
                </Row>
                <Row>
                    <Col md={3} className='d-flex justify-content-center align-items-center'>
                        <img
                        src={selectedMovie?.imgMovie}
                        alt={selectedMovie?.nombre}
                        //className="card-img"
                        style={{ height: '200px', objectFit: 'cover' }}
                        className='img.fluid'
                        />
                    </Col>
                    <Col md={9}> 
                        <p className='texto'>Duracion: {selectedMovie?.duracion}</p>
                        <p className='texto'>Categoria: {movieCategory?.name}</p>
                        <p className='texto'>Director: {movieAuthor?.nombre}</p>
                        <p className='texto'>Sinopsis: {selectedMovie?.sinopsis}</p>
                    </Col>
                </Row>
                <Row>
                    <h3 className='texto centrar'>Horarios</h3>
                    <div className='row justify-content-center'>    
                            <Horarios movie={selectedMovie} movieId={selectedMovie?.id}/>
                    </div>
                </Row>
          
            </Container>
        

    )
};