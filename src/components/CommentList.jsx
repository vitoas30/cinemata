import React from 'react';

const CommentItem = ({ comment }) => (
  <div className="comment-item">
    <div className="comment-header">
      <div className="comment-avatar">
        {comment.name.charAt(0).toUpperCase()}
      </div>
      <span className="comment-name">{comment.name}</span>
      <span className="comment-stars">{'★'.repeat(comment.rating)}</span>
      <span className="comment-date">{comment.date}</span>
    </div>
    <div className="comment-text">{comment.text}</div>
  </div>
);

const CommentList = ({ comments }) => {
  if (comments.length === 0) {
    return (
      <div className="empty-comments">
        Belum ada komentar. Jadilah yang pertama! ✨
      </div>
    );
  }

  return (
    <div>
      <div className="comments-count">{comments.length} komentar</div>
      <div className="comments-list">
        {[...comments].reverse().map((c, i) => (
          <CommentItem key={i} comment={c} />
        ))}
      </div>
    </div>
  );
};

export default CommentList;
