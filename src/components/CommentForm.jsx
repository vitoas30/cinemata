import React, { useState } from 'react';
import StarRating from './StarRating';

const CommentForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [rating, setRating] = useState(0);
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!name.trim()) { setError('Masukkan nama kamu!'); return; }
    if (!text.trim()) { setError('Tulis komentar dulu!'); return; }
    if (!rating)       { setError('Pilih rating bintang!'); return; }

    onSubmit({ name: name.trim(), text: text.trim(), rating, date: 'Baru saja' });
    setName('');
    setText('');
    setRating(0);
    setError('');
  };

  return (
    <div className="comment-form">
      <div className="comment-form-title">Tulis Komentar Kamu</div>

      <div className="form-row">
        <input
          className="form-input name"
          placeholder="Nama kamu"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div style={{ marginBottom: '8px' }}>
        <div style={{ fontSize: '11px', color: '#7a7585', marginBottom: '6px', letterSpacing: '1px', textTransform: 'uppercase' }}>
          Rating
        </div>
        <StarRating value={rating} onChange={setRating} />
      </div>

      <textarea
        className="form-textarea"
        placeholder="Apa pendapat kamu tentang film ini?"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      {error && <div className="error-text">⚠ {error}</div>}

      <button className="submit-btn" onClick={handleSubmit} type="button">
        Kirim Komentar
      </button>
    </div>
  );
};

export default CommentForm;
