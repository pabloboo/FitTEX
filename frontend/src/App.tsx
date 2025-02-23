import React, { useState } from 'react';
import axios from 'axios';
import "./App.css";
import SearchBar from './components/SearchBar/SearchBar';
import ImageUploader from './components/ImageUploader/ImageUploader';
import ProductList from './components/ProductList/ProductList';

const AUTHORIZED_BRANDS = ['lefties', 'massimo_dutti', 'oysho', 'pull_and_bear', 'stradivarius', 'zara', 'zara_home'];

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

const searchProducts = async (query: string, brand?: string) => {
  try {
    const response = await axios.get('http://localhost:3000/search', {
      params: { query, brand },
    });
    return response.data;
  } catch (error) {
    console.error('Error searching products:', error);
    return null;
  }
};

function App() {
  const [, setSelectedImage] = useState<File | null>(null);
  const [, setImagePreview] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [apiResponse, setApiResponse] = useState<any[] | null>(null);
  const [firstSearchDone, setFirstSearchDone] = useState(false);
  const [, setAnimateUp] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [textLoading, setTextLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  // Handles image selection and triggers product search
  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target?.files[0]) {
      const file = event.target?.files[0];
      setSelectedImage(file);

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
    const response = await processPrompt(searchQuery);
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

  const processPrompt = async (prompt: string) => {
    const response = await fetch('http://127.0.0.1:8000/process-prompt', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      throw new Error('Error processing the prompt');
    }

    console.log(response.json());

    return response.json();
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