// src/components/Principal.js
import React from 'react';
import MovieCard from '../components/mostrar';
import CategorySelect from '../components/categorias';
import Navbar from '../components/navegacion';



const movies = [
  { id: 1, title: 'Inception', duration: '2h 28m', image: 'https://posters.movieposterdb.com/24_04/2024/6263850/l_deadpool-wolverine-movie-poster_269f8e79.jpg' },
  { id: 2, title: 'Interstellar', duration: '2h 49m', image: 'https://image.tmdb.org/t/p/w500/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg' },
  { id: 3, title: 'The Dark Knight', duration: '2h 32m', image: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg' },
];

export function Principal() {
  return (
    
    <div className="container">
        <Navbar></Navbar>
        <CategorySelect></CategorySelect>
        <div className='row justify-content-center'>
            <div className='col-6'>
                <div className='row justify-content-center'>
                    {movies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            </div>
        </div>
    </div>
  );
}

export default Principal;
