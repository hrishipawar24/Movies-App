import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Movie from './Movie';
import MovieDetailsModal from './MovieDetailsModal';

function Movies() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  async function getMovies(query) {
    if (!query) return;
    setIsLoading(true);
    setError(null);
    setHasSearched(true);
    try {
      const apikey = process.env.REACT_APP_OMDB_API_KEY || "12ccb8ac";
      const res = await axios.get(`https://www.omdbapi.com/?apikey=${apikey}&s=${query}`);
      const data = res.data;
      if (data.Response === "True") {
        setMovies(data.Search);
      } else {
        setMovies([]);
        setError(data.Error);
      }
    } catch (err) {
      setError("Failed to fetch movies. Please try again later.");
      setMovies([]);
    } finally {
      setIsLoading(false);
    }
  }

  const handleSearch = (e) => {
    e.preventDefault();
    getMovies(searchTerm);
  };

  return (
    <div className='movies-container'>
      <header className='search-header'>
        <div className='header-content'>
          <h1 className='logo-title' onClick={() => { setSearchTerm(''); setHasSearched(false); setMovies([]); }}>CineQuest</h1>
          <form onSubmit={handleSearch} className='search-form'>
            <input
              type="text"
              placeholder="Search for movies, series, or episodes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='search-input'
            />
            <button type="submit" disabled={isLoading || !searchTerm.trim()} className='search-btn'>
              {isLoading ? 'Searching...' : 'Search'}
            </button>
          </form>
        </div>
      </header>

      <main className="main-content">
        {!hasSearched && !isLoading && !error ? (
          <div className="home-hero">
            <h2>Welcome to CineQuest</h2>
            <p>Discover your next favorite movie, TV show, or series.</p>
            <div className="hero-features">
              <div className="feature-card">
                <h3>Millions of Titles</h3>
                <p>Search through an extensive database of global entertainment.</p>
              </div>
              <div className="feature-card">
                <h3>Rich Details</h3>
                <p>Get full plot summaries, cast info, and IMDb ratings instantly.</p>
              </div>
            </div>
          </div>
        ) : error ? (
          <div className="status-state error-state">
            <h2>Oops!</h2>
            <p>{error}</p>
          </div>
        ) : isLoading ? (
          <div className="status-state loading-state">
            <div className="spinner"></div>
            <p>Exploring the cinematic universe...</p>
          </div>
        ) : movies.length > 0 ? (
          <div className='movies-grid'>
            {movies.map(el => (
              <Movie key={el.imdbID} el={el} onClick={(movie) => setSelectedMovieId(movie.imdbID)} />
            ))}
          </div>
        ) : (
          <div className="status-state empty-state">
            <h2>No results yet</h2>
            <p>We couldn't find anything matching your search. Try another title.</p>
          </div>
        )}
      </main>

      {selectedMovieId && (
        <MovieDetailsModal 
          imdbID={selectedMovieId} 
          onClose={() => setSelectedMovieId(null)} 
        />
      )}
    </div>
  );
}

export default Movies;