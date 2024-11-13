import { useNavigate } from 'react-router-dom';

export function MovieCard({ movie, error}) {
  const navigate = useNavigate();
  

  return (
    <div className="card mb-3" style={{ minWidth: '900px' }}>
      <div className="row no-gutters d-flex align-items-center mx-0">
        <div className="col-md-4 p-0">
          <img
            src={movie.imgMovie}
            alt={movie.nombre}
            className="card-img"
            style={{ height: '200px', objectFit: 'cover' }}
          />
        </div>
        <div className="col-md-5">
          <div className="card-body">
            <h5 className="card-title">{movie.nombre}</h5>
            <p className="card-text text-muted">{movie.duracion}</p>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card-body">
            <button className='btn btn-dark' onClick={() => { navigate('/Pelicula') }}>Reserva tu lugar</button>
          </div>
        </div>
      </div>
      {error && <p className="text-danger">{error}</p>}
    </div>
  );
}

export default MovieCard;
