import { useState } from 'react';
import './App.css';
import { mockApiCall } from './services/mockApi';

function App() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [apiResponse, setApiResponse] = useState<any[] | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedImage(event.target.files[0]);
    }
  };

  const handleSearch = async () => {
    if (selectedImage) {
      // Simulamos la URL de la imagen seleccionada
      const imageUrl = URL.createObjectURL(selectedImage);

      // Llamamos a la función mock
      const response = await mockApiCall(imageUrl);
      setApiResponse(response);
    }
  };

  return (
    <>

      {/* Input para seleccionar una imagen */}
      <div>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <button onClick={handleSearch}>Buscar productos</button>
      </div>

      {/* Mostrar la respuesta de la API */}
      {apiResponse && (
        <div>
          <h2>Productos encontrados:</h2>
          <ul>
            {apiResponse.map(product => (
              <li key={product.id}>
                <h3>{product.name}</h3>
                <p>Precio: {product.price.value.current} {product.price.currency}</p>
                <a href={product.link} target="_blank" rel="noopener noreferrer">Ver producto</a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default App;