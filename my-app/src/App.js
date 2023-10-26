// // c2421ea7--API KEY

import SearchIcon from "./search.svg";
import { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import "./App.css";

const API_URL = "http://www.omdbapi.com/";
const API_KEY = "c2421ea7";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  
  
  useEffect(() => {
    searchMovies(searchTerm, currentPage);
  }, [searchTerm, currentPage]); 

  const searchMovies = async (title, page) => {
    try {
      const response = await fetch(`${API_URL}?apikey=${API_KEY}&s=${title}&page=${page}`);
      const data = await response.json();

      if (data.Response === "True") {
        if (page === 1) {
          setMovies(data.Search);
        } else {
          setMovies(prevMovies => [...prevMovies, ...data.Search]);
        }
      } else {
        // Handle no movies found
        setMovies([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleLoadMore = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <div className="app">
      <h1>MovieLand</h1>

      <div className="search">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for movies"
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => {
            setCurrentPage(1); // Reset page to 1 when initiating a new search
            searchMovies(searchTerm, 1);
          }}
        />
      </div>

      {movies?.length > 0 && (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      )}

      {movies.length > 0 && (
        <div className="load-more">
          <button onClick={handleLoadMore}>Load More</button>
        </div>
      )}

      {movies.length === 0 && <div className="empty"><h2>You didnt search Movies<br/>⬆️Search for movies⬆️</h2></div>}
      <footer className="footer">
        <p>All rights reserved for OMDB API ©Sardar_Sadiq</p>
      </footer>
    </div>
  );
};

export default App;

//----------------------------------------------------------------------------------------

