import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function CategorySelect() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Traer las categorías desde la API con fetch
    fetch('http://localhost:8000/api/categories')
      .then(response => response.json())
      .then(data => {
        setCategories(data);
      })
      .catch(error => {
        console.error('Error al obtener las categorías', error);
      });
  }, []);

  return (
    <div className="mb-3" style={{maxWidth:'250px'} }>
      <select id="category-select" className=" select-form btn btn-dark mt-2">
        <option value="" disabled selected>Seleccionar categoría</option>
        {categories.map(category => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
}
