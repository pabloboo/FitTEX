import React, { useState } from 'react';
import axios from 'axios';
import "./App.css";
import { mockTextSearchApiCall } from "./services/mockApi";
import SearchBar from './components/SearchBar/SearchBar';
import ImageUploader from './components/ImageUploader/ImageUploader';
import ProductList from './components/ProductList/ProductList';

// Fetches products from the API based on an image URL
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
  // State for managing the selected image file (not used directly in the UI)
  const [, setSelectedImage] = useState<File | null>(null);
  // State for storing the image preview URL (not used directly in the UI)
  const [, setImagePreview] = useState<string | null>(null);

  // State for managing the search query input
  const [searchQuery, setSearchQuery] = useState("");
  // State for storing the API response (list of products)
  const [apiResponse, setApiResponse] = useState<any[] | null>(null);

  // State to track if the first search has been performed
  const [firstSearchDone, setFirstSearchDone] = useState(false);
  // State for triggering the animation (not used directly in the UI)
  const [, setAnimateUp] = useState(false);

  // State for managing the loading state for image search
  const [imageLoading, setImageLoading] = useState(false);
  // State for managing the loading state for text search
  const [textLoading, setTextLoading] = useState(false);

  // State for controlling the visibility of the results section
  const [showResults, setShowResults] = useState(false);

  // Handles image selection and triggers product search
const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
  if (event.target.files && event.target?.files[0]) {
    const file = event.target?.files[0];
    setSelectedImage(file);

    // Subir la imagen al servidor y obtener la URL pública
    setImageLoading(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const uploadResponse = await axios.post('http://localhost:3000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const imageUrl = uploadResponse.data.imageUrl;

      // Realizar la búsqueda de productos con la URL pública
      const response = await fetchProducts(imageUrl);
      setApiResponse(response);

      // Trigger animation on first search
      if (!firstSearchDone) {
        setFirstSearchDone(true);
        setAnimateUp(true);
      }

      // Delay results display by 500ms
      setTimeout(() => {
        setShowResults(true);
        setImageLoading(false);
      }, 500);
    } catch (error) {
      console.error('Error uploading image:', error);
      setImageLoading(false);
    }
  }
};
  // Handles text-based search
  const handleTextSearch = async () => {
    setApiResponse(null);
    setTextLoading(true); // Use textLoading for text search
    const response = await mockTextSearchApiCall(searchQuery);
    setApiResponse(response);

    // Trigger animation on first search
    if (!firstSearchDone) {
      setFirstSearchDone(true);
      setAnimateUp(true);
    }

    // Delay results display by 500ms
    setTimeout(() => {
      setShowResults(true);
      setTextLoading(false);
    }, 500);
  };

  return (
    <div className={`App ${firstSearchDone ? "animate-up" : ""}`}>
      <div className="search-container">
        <img src="/src/assets/logo-FitTEX.png" alt="Logo" className="logo" />
        <SearchBar
          searchQuery={searchQuery}
          onSearchQueryChange={(e) => setSearchQuery(e.target.value)}
          onTextSearch={handleTextSearch}
          onImageSearch={() => document.getElementById("file-upload")?.click()}
          imageLoading={imageLoading}
          textLoading={textLoading}
        />
        <ImageUploader onImageChange={handleImageChange} />
      </div>

      {/* Display the product list if there is an API response */}
      {apiResponse && (
        <ProductList products={apiResponse} showResults={showResults} />
      )}
    </div>
  );
}

export default App;