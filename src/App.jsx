import React, { useState } from 'react';
import './App.css';
import MOVIES from './data/movies';
import MovieCard from './components/MovieCard';
import DetailPanel from './components/DetailPanel';

const FILMS_PER_PAGE = 5;

// Seed komentar awal
const seedComments = {
  1: [
    { name: 'Andi', rating: 5, text: 'Film terbaik yang pernah saya tonton! Konsepnya benar-benar luar biasa.', date: '2 hari lalu' },
    { name: 'Sari', rating: 4, text: 'Agak membingungkan di awal tapi worth it banget.', date: '5 hari lalu' },
  ],
  3: [
    { name: 'Budi', rating: 5, text: 'Heath Ledger sebagai Joker = tak tertandingi. Performa terbaik sepanjang masa.', date: '1 minggu lalu' },
  ],
  10: [
    { name: 'Dewi', rating: 5, text: 'Masterpiece sepanjang masa. Al Pacino dan Marlon Brando luar biasa!', date: '3 hari lalu' },
    { name: 'Reza', rating: 5, text: 'Film yang wajib ditonton setidaknya sekali seumur hidup.', date: '1 minggu lalu' },
  ],
  18: [
    { name: 'Maya', rating: 5, text: 'J.K. Simmons dan Miles Teller chemistry-nya gila. Film tentang dedikasi yang brutal.', date: '4 hari lalu' },
  ],
};

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [comments, setComments] = useState(() => {
    const init = {};
    MOVIES.forEach((m) => { init[m.id] = seedComments[m.id] || []; });
    return init;
  });

  const totalPages = Math.ceil(MOVIES.length / FILMS_PER_PAGE);
  const pageMovies = MOVIES.slice(
    (currentPage - 1) * FILMS_PER_PAGE,
    currentPage * FILMS_PER_PAGE
  );

  const totalComments = Object.values(comments).reduce((sum, c) => sum + c.length, 0);

  const handleSelectMovie = (movie) => {
    if (selectedMovie?.id === movie.id) {
      setSelectedMovie(null);
    } else {
      setSelectedMovie(movie);
    }
  };

  const handleAddComment = (comment) => {
    if (!selectedMovie) return;
    setComments((prev) => ({
      ...prev,
      [selectedMovie.id]: [...prev[selectedMovie.id], comment],
    }));
  };

  const handleChangePage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    setSelectedMovie(null);
  };

  return (
    <div>
      {/* ── Header ── */}
      <header className="header">
        <div>
          <div className="logo">CINE<span>MATA</span></div>
          <div className="header-sub">Review &amp; Komentar Film</div>
        </div>
        <div className="header-stats">
          <div className="stat-pill">
            <span className="stat-num">{MOVIES.length}</span>
            <span className="stat-label">Film</span>
          </div>
          <div className="stat-pill">
            <span className="stat-num">{totalComments}</span>
            <span className="stat-label">Ulasan</span>
          </div>
        </div>
      </header>

      {/* ── Main Content ── */}
      <main className="main">
        <div className="section-title">
          Film Populer — Halaman {currentPage} dari {totalPages}
        </div>

        {/* ── Grid ── */}
        <div className="movies-grid">
          {pageMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              isActive={selectedMovie?.id === movie.id}
              onClick={handleSelectMovie}
            />
          ))}
        </div>

        {/* ── Pagination ── */}
        <div className="pagination">
          <button
            className="page-btn"
            onClick={() => handleChangePage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            ←
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              className={`page-btn ${p === currentPage ? 'active' : ''}`}
              onClick={() => handleChangePage(p)}
            >
              {p}
            </button>
          ))}
          <button
            className="page-btn"
            onClick={() => handleChangePage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            →
          </button>
        </div>

        {/* ── Detail Panel ── */}
        {selectedMovie && (
          <DetailPanel
            movie={selectedMovie}
            comments={comments[selectedMovie.id]}
            onClose={() => setSelectedMovie(null)}
            onAddComment={handleAddComment}
          />
        )}
      </main>
    </div>
  );
}

export default App;
