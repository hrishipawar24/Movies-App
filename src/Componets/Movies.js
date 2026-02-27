import React, { useState } from 'react';
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
    if (!query || !query.trim()) return;
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

  const resetHome = () => {
    setSearchTerm('');
    setHasSearched(false);
    setMovies([]);
    setError(null);
  };

  return (
    <div className='movies-container'>
      <header className={`search-header ${!hasSearched ? 'header-hidden' : ''}`}>
        <div className='header-content'>
          <div className='header-left'>
            <button className='back-btn' onClick={resetHome} title="Go Back to Home">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>
            </button>
            <h1 className='logo-title' onClick={resetHome}>CineQuest</h1>
          </div>
          {hasSearched && (
            <form onSubmit={handleSearch} className='search-form'>
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='search-input'
              />
              <button type="submit" disabled={isLoading} className='search-btn'>
                {isLoading ? '...' : 'Search'}
              </button>
            </form>
          )}
        </div>
      </header>

      <main className="main-content">
        {!hasSearched && !isLoading && !error ? (
          <div className="home-hero">
            <h1 className='hero-logo'>CineQuest</h1>
            <p className='hero-tagline'>Explore the world of cinema in one click.</p>
            
            <form onSubmit={handleSearch} className='hero-search-form'>
              <div className='search-wrapper'>
                <input
                  type="text"
                  placeholder="Ask CineQuest for a movie, series, or actor..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className='hero-search-input'
                  autoFocus
                />
                <button type="submit" className='hero-search-btn'>
                  Search Now
                </button>
              </div>
            </form>

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
            <h2>No results found</h2>
            <p>Try a different keyword or check for typos.</p>
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