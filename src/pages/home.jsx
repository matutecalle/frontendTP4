// src/components/Principal.js
import React from 'react';
import { useState, useEffect } from 'react';
import MovieCard from '../components/mostrar';
import CategorySelect from '../components/categorias';
import Navbar from '../components/navegacion';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';


export function Principal() {
  const [errorMessage, setErrorMessage] = useState('');
  const {user, movies, setMovies}=useContext(AppContext);
  const navigate=useNavigate();

  /*if(user === null){
    navigate('/iniciosesion');
  }*/

  useEffect(() => {
    // Enviar solicitud a la API para obtener las películas al cargar el componente
    const fetchMovies = async () => {
      try {
        const peliResponse = await fetch("http://localhost:8000/api/movies", {
          method: "GET",
        });

        const peliResult = await peliResponse.json();

        if (peliResponse.ok) {
          setMovies(peliResult); // Guarda las películas en el estado
          console.log(peliResult);
        } else {
          setErrorMessage(peliResult.message || "Error al obtener las películas.");
        }
      } catch (error) {
        setErrorMessage("Error de conexión con el servidor.");
        console.error("Error de conexión:", error);
      }
    };

    fetchMovies();
  }, []);


  return (
    
    <div className="container">
        <Navbar></Navbar>
        <CategorySelect></CategorySelect>
        <div className='row justify-content-center'>
            <div className='col-6'>
                <div className='row justify-content-center'>
                    {movies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} error={errorMessage}/>
                    ))}
                </div>
            </div>
        </div>
    </div>
  );
}

export default Principal;
