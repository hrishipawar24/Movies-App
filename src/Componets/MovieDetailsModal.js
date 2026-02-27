import React, { useEffect, useState } from 'react';
import axios from 'axios';

function MovieDetailsModal({ imdbID, onClose }) {
  const [details, setDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchDetails() {
      if (!imdbID) return;
      try {
        const apikey = process.env.REACT_APP_OMDB_API_KEY || "12ccb8ac";
        const res = await axios.get(`https://www.omdbapi.com/?apikey=${apikey}&i=${imdbID}&plot=full`);
        if (res.data.Response === "True") {
          setDetails(res.data);
        } else {
          setError(res.data.Error);
        }
      } catch (err) {
        setError("Failed to load details.");
      } finally {
        setIsLoading(false);
      }
    }
    fetchDetails();
    
    // Lock body scroll
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [imdbID]);

  if (!imdbID) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>&times;</button>
        
        {isLoading ? (
          <div className="modal-loading">
            <div className="spinner"></div>
            <p>Loading details...</p>
          </div>
        ) : error ? (
          <div className="modal-error">
            <p>{error}</p>
          </div>
        ) : details && (
          <div className="modal-body">
            <div className="modal-poster-col">
              <img 
                src={(details.Poster && details.Poster !== 'N/A') ? details.Poster : 'https://via.placeholder.com/300x450/121212/ffffff?text=No+Poster'} 
                alt={details.Title} 
                className="modal-poster"
                onError={(e) => {
                  e.target.onerror = null; 
                  e.target.src = 'https://via.placeholder.com/300x450/121212/ffffff?text=No+Poster';
                }}
              />
              <div className="modal-ratings">
                <span className="rating-badge imdb">IMDb: {details.imdbRating}</span>
                <span className="rating-badge year">{details.Year}</span>
                <span className="rating-badge runtime">{details.Runtime}</span>
              </div>
            </div>
            
            <div className="modal-info-col">
              <h2 className="modal-title">{details.Title} <span className="modal-genre">({details.Genre})</span></h2>
              
              <div className="modal-crew">
                <p><strong>Director:</strong> {details.Director}</p>
                <p><strong>Writer:</strong> {details.Writer}</p>
                <p><strong>Actors:</strong> {details.Actors}</p>
              </div>

              <div className="modal-plot">
                <h3>Plot</h3>
                <p>{details.Plot}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MovieDetailsModal;
