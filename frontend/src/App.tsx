import { useState } from "react";
import "./App.css";
import { mockApiCall } from "./services/mockApi";

function App() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [apiResponse, setApiResponse] = useState<any[] | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setSelectedImage(file);

      // Create an URL for the image preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSearch = async () => {
    if (selectedImage) {
      const imageUrl = URL.createObjectURL(selectedImage);
      const response = await mockApiCall(imageUrl);
      setApiResponse(response);
    }
  };

  return (
    <div className="App">
      <h1>Buscador de Productos por Imagen</h1>
      <div>
        <label htmlFor="file-upload" className="custom-file-upload">
          Seleccionar imagen
        </label>
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
        <button onClick={handleSearch}>Buscar productos</button>
      </div>

      {/* Preview of the image */}
      {imagePreview && (
        <div className="image-preview-container">
          <img
            src={imagePreview}
            alt="Vista previa de la imagen seleccionada"
            className="image-preview"
          />
          <p className="image-confirmation">✅ Imagen cargada correctamente</p>
        </div>
      )}

      {/* Show response of the API */}
      {apiResponse && (
        <div>
          <h2>Productos encontrados:</h2>
          <ul>
            {apiResponse.map((product) => (
              <li key={product.id}>
                <h3>{product.name}</h3>
                <p>
                  Precio: {product.price.value.current} {product.price.currency}
                </p>
                <a href={product.link} target="_blank" rel="noopener noreferrer">
                  Ver producto
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;