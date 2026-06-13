import React from 'react';

const NotificationModal = ({ message, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ borderColor: 'var(--chalk-pink)' }}>
        <h2 className="chalk-text" style={{ color: 'var(--chalk-pink)', marginBottom: '20px', fontSize: '2.5rem' }}>
          알림!
        </h2>
        <p className="chalk-text" style={{ fontSize: '1.5rem', marginBottom: '30px' }}>
          {message}
        </p>
        <button className="chalk-button" onClick={onClose} style={{ borderColor: 'var(--chalk-pink)', color: 'var(--chalk-pink)' }}>
          확인
        </button>
      </div>
    </div>
  );
};

export default NotificationModal;
