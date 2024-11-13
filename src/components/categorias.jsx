import React, { useEffect, useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function CategorySelect() {
  const { movies, setMovies } = useContext(AppContext);
  const [allMovies, setAllMovies] = useState([]); 
  const [categories, setCategories] = useState([]);
  const [categoriaSelec, setCategoriaSelec] = useState("");

  useEffect(() => {
    fetch('http://localhost:8000/api/movies')
      .then(response => response.json())
      .then(data => {
        setAllMovies(data); 
        setMovies(data); 
      })
      .catch(error => {
        console.error('Error al obtener las películas', error);
      });

    
    fetch('http://localhost:8000/api/categories')
      .then(response => response.json())
      .then(data => {
        setCategories(data);
      })
      .catch(error => {
        console.error('Error al obtener las categorías', error);
      });
  }, []);

  function cambiarPelis(id) {
    if (id) {
      const nuevo = allMovies.filter(movie => movie.idCategoria === id);
      setMovies(nuevo);
    } else {
      setMovies(allMovies); 
    }
  }

  const handleCategoryChange = (event) => {
    const selectedId = Number(event.target.value);
    setCategoriaSelec(selectedId);
    cambiarPelis(selectedId);
  };

  return (
    <div className="mb-3" style={{ maxWidth: '250px' }}>
      <select
        id="category-select"
        className="form-select btn btn-dark mt-2"
        value={categoriaSelec}
        onChange={handleCategoryChange}
      >
        <option value="">Sin filtro</option>
        {categories.map(category => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
}
