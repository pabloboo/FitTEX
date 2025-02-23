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

const getOrder = async (brand: string, id: string) => {
  try {
    const response = await axios.get('http://localhost:3000/order', {
      params: { brand, id },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching order:', error);
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
    setTextLoading(true);

    let query = searchQuery.trim();
    let brand: string | undefined = undefined;

    const isOrderId = !isNaN(Number(query.split(' ')[0])); // Verifica si el primer término es un número

    if (isOrderId) {
      const terms = query.split(' ');
      const id = terms[0]; // El primer término es el ID
      query = terms.slice(1).join(' '); // El resto son la marca y/o otros términos

      for (const authorizedBrand of AUTHORIZED_BRANDS) {
        if (query.toLowerCase().includes(authorizedBrand)) {
          brand = authorizedBrand;
          break;
        }
      }

      if (!brand) {
        brand = 'zara';
      }

      try {
        const response = await getOrder(brand, id);
        setApiResponse(response ? [response] : null); // Asegurarse de que la respuesta sea un array
      } catch (error) {
        console.error('Error fetching order:', error);
      }
    } else {
      for (const authorizedBrand of AUTHORIZED_BRANDS) {
        if (query.toLowerCase().includes(authorizedBrand)) {
          brand = authorizedBrand;
          query = query.replace(new RegExp(authorizedBrand, 'i'), '').trim(); // Eliminar la marca del query
          break;
        }
      }

      try {
        const response = await searchProducts(query, brand);
        setApiResponse(response);
      } catch (error) {
        console.error('Error during search:', error);
      }
    }

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