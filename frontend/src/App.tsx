import React, { useState } from 'react';
import axios from 'axios';
import "./App.css";
import { mockApiCall, mockTextSearchApiCall } from "./services/mockApi";


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
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [apiResponse, setApiResponse] = useState<any[] | null>(null);
  const [, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [animateUp, setAnimateUp] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target?.files[0]) {
      const file = event.target?.files[0];
      setSelectedImage(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      // Trigger search after image is selected
      setLoading(true);
      let imageUrl = URL.createObjectURL(file);
      imageUrl = imageUrl.replace('blob:', '');
      const response = await fetchProducts(imageUrl);
      setApiResponse(response);
      setLoading(false);
          setAnimateUp(true);
 // Delay results 500ms
    setTimeout(() => {
      setShowResults(true);
      setLoading(false);
    }, 500);
    }
  };

  const handleTextSearch = async () => {
    setLoading(true);
    const response = await mockTextSearchApiCall(searchQuery);
    setApiResponse(response);
    setAnimateUp(true);

    // Delay results 500ms
    setTimeout(() => {
      setShowResults(true);
      setLoading(false);
    }, 500);
  };

  return (
    <div className="App">
      <div className={`search-container ${animateUp ? "animate-up" : ""}`}>
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
            onClick={() => document.getElementById("file-upload")?.click()}
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
        <div className={`results-container ${showResults ? "show" : ""}`}>
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