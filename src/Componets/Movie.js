import React, { useState } from 'react';

function Movie({ el, onClick }) {
  const [imgError, setImgError] = useState(false);
  const fallbackImg = 'https://via.placeholder.com/300x450/121212/ffffff?text=No+Poster';
  const posterSrc = (!imgError && el.Poster && el.Poster !== 'N/A') ? el.Poster : fallbackImg;

  return (
    <div className='movie-card' onClick={() => onClick && onClick(el)}>
      <div className='poster-wrapper'>
        <img 
          src={posterSrc} 
          alt={el.Title} 
          className='movie-poster' 
          onError={() => setImgError(true)}
        />
        <div className='movie-overlay'>
          <span className='view-details-btn'>View Details</span>
        </div>
      </div>
      <div className='movie-info'>
        <h3 className='movie-title'>{el.Title}</h3>
        <span className='movie-year'>{el.Year}</span>
      </div>
    </div>
  );
}

export default Movie;