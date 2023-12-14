import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import apiKey from './config';

// Import components
import Header from './components/Header';
import Gallery from './components/Gallery';
import NotFound from './components/NotFound';

function App() {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [catResults, setCatResults] = useState([]);
  const [dogResults, setDogResults] = useState([]);
  const [rainbowResults, setRainbowResults] = useState([]);

  // Trigger API requests for tabbed topics after App component is mounted
  useEffect(() => {
    performSearch('cats');
    performSearch('dogs');
    performSearch('rainbow');
  }, []);

  // Perform API request for photos and update state
  const performSearch = (query = 'cats') => {
    setLoading(true);
    fetch(
      `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&sort=relevance&format=json&nojsoncallback=1`
    )
      .then((response) => response.json())
      .then((responseData) => {
        // Update state based on query
        if (query === 'cats') {
          setCatResults(responseData.photos.photo);
        } else if (query === 'dogs') {
          setDogResults(responseData.photos.photo);
        } else if (query === 'rainbow') {
          setRainbowResults(responseData.photos.photo);
        } else {
          setResults(responseData.photos.photo);
          setSearchTerm(query);
        }
        setLoading(false);
      })
      .catch((error) => console.log('Error fetching or parsing data', error));
  };

  return (
    <Router>
      <div className="container">
        <Header newSearch={performSearch} />

        <Routes>
          {/* Redirect root path to /cats */}
          <Route
            path="/"
            element={<Navigate to="/cats" replace />}
          />

          <Route
            path="/cats"
            element={
              loading ? <p>Loading...</p> : <Gallery pictures={catResults} query="cats" />
            }
          />
          <Route
            path="/dogs"
            element={
              loading ? <p>Loading...</p> : <Gallery pictures={dogResults} query="dogs" />
            }
          />
          <Route
            path="/rainbow"
            element={
              loading ? <p>Loading...</p> : <Gallery pictures={rainbowResults} query="rainbow" />
            }
          />

          {/* Route for search queries */}
          <Route
            path="/search/:topic"
            element={
              loading ? <p>Loading...</p> : <Gallery pictures={results} query={searchTerm} />
            }
          />

          {/* Route for 404 error */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
