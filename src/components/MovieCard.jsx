import React from 'react';

const MovieCard = ({ movie, isActive, onClick }) => {
  return (
    <div
      className={`movie-card ${isActive ? 'active' : ''}`}
      onClick={() => onClick(movie)}
    >
      <div
        className="movie-poster"
        style={{ background: movie.color }}
      >
        <div className="poster-icon">{movie.icon}</div>
        <div className="poster-year">{movie.year}</div>
      </div>
      <div className="movie-info">
        <div className="movie-title">{movie.title}</div>
        <div className="movie-meta">
          <span className="movie-genre">{movie.genre}</span>
          <span className="movie-rating">
            <span>★</span>{movie.rating}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
