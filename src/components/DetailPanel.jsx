import React from 'react';
import CommentForm from './CommentForm';
import CommentList from './CommentList';

const DetailPanel = ({ movie, comments, onClose, onAddComment }) => {
  const avgRating = comments.length > 0
    ? (comments.reduce((sum, c) => sum + c.rating, 0) / comments.length).toFixed(1)
    : movie.rating;

  const roundedAvg = parseFloat(avgRating);
  const fullStars = Math.round(roundedAvg);
  const stars = '★'.repeat(fullStars) + '☆'.repeat(5 - fullStars);

  return (
    <div className="detail-panel">
      <div className="detail-panel-header-row">
        <div className="section-title" style={{ marginBottom: 0 }}>Detail Film</div>
        <button className="close-btn" onClick={onClose} type="button">✕ Tutup</button>
      </div>

      <div className="detail-body">
        <div
          className="detail-poster"
          style={{ background: movie.color }}
        >
          <div className="detail-poster-icon">{movie.icon}</div>
          <div className="detail-poster-year">{movie.year}</div>
        </div>

        <div className="detail-info">
          <div className="detail-title">{movie.title}</div>

          <div className="detail-tags">
            <span className="tag gold">{movie.genre}</span>
            <span className="tag">{movie.year}</span>
            <span className="tag">{comments.length} komentar</span>
          </div>

          <div className="detail-rating">
            <span className="stars-display">{stars}</span>
            <span className="rating-big">{roundedAvg}</span>
            <span className="rating-count">
              {comments.length > 0 ? `(${comments.length} ulasan)` : '(Rating awal)'}
            </span>
          </div>

          <p className="detail-synopsis">{movie.synopsis}</p>
        </div>
      </div>

      <div className="section-title">Komentar Penonton</div>

      <CommentForm onSubmit={onAddComment} />
      <CommentList comments={comments} />
    </div>
  );
};

export default DetailPanel;
