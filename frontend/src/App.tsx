import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import {config} from "dotenv";

const fetchProducts = async (imageUrl: string) => {

  try {
    const response = await axios.get('http://localhost:3000/products', {
      params: { imageUrl },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    return null;
  }
};

function App() {
  const [apiResponse, setApiResponse] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target?.files[0]) {
      const file = event.target?.files[0];
      await handleSearch(file);
    }
  };

  const handleSearch = async (file: File) => {
    setLoading(true);
    const imageUrl = URL.createObjectURL(file);
    const response = await fetchProducts(imageUrl);
    setApiResponse(response);
    setLoading(false);
  };

  const handleTextSearch = () => {
    //TODO: Implement text search functionality
    console.log("Searching for:", searchQuery);
  };

  const triggerFileInput = () => {
    document.getElementById("file-upload")?.click();
  };

  return (
    <div className="App">
      <div className="search-container">
        <img src="/src/assets/logo-FitTEX.png" alt="Logo" className="logo" />
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button onClick={handleTextSearch}>Search</button>
          <button
            onClick={triggerFileInput}
            disabled={loading}
            className={`image-search-button ${loading ? "loading" : ""}`}
            title="Search by image"
          >
            <img
              src="/src/assets/image-search-icon.png"
              alt="Search by image"
              className="image-search-icon"
            />
          </button>
        </div>
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: "none" }}
        />
      </div>

      {/* Show response of the API */}
      {apiResponse && (
        <div className="results-container">
          <h2>Products found:</h2>
          <ul>
            {apiResponse.map((product) => (
              <li key={product.id}>
                <h3>{product.name}</h3>
                <p>
                  Price: {product.price.value.current} {product.price.currency}
                </p>
                <a href={product.link} target="_blank" rel="noopener noreferrer">
                  See product
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