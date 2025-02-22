import { useState } from "react";
import "./App.css";
import { mockApiCall } from "./services/mockApi";

function App() {
  const [apiResponse, setApiResponse] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [animateUp, setAnimateUp] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      await handleSearch(file);
    }
  };

  const handleSearch = async (file: File) => {
    setLoading(true);
    const imageUrl = URL.createObjectURL(file);
    const response = await mockApiCall(imageUrl);
    setApiResponse(response);
    setAnimateUp(true);

    // Delay results 500ms
    setTimeout(() => {
      setShowResults(true);
      setLoading(false);
    }, 500);
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

      {/* Mostrar resultados con retraso */}
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