// src/components/MovieCard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

export function MovieCard({ movie }) {
  const { image, title, duration } = movie;
  const navigate = useNavigate ();

  return (
    <div className="card mb-3" style={{ minWidth: '900px' }}>
      <div className="row no-gutters d-flex align-items-center mx-0">
        <div className="col-md-4 p-0">
          <img
            src={image}
            alt={title}
            className="card-img"
            style={{ height: '200px', objectFit: 'cover' }}
          />
        </div>
        <div className="col-md-5">
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text text-muted">{duration}</p>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card-body">
            <button className='btn btn-dark' onClick={()=>{navigate ('/Pelicula')}}>Reserva tu lugar</button>
          </div>
        </div>
      </div>
    </div>
  );
  
}

export default MovieCard;
