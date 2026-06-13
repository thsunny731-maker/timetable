import React, { useState } from 'react';

const TeacherModeModal = ({ onClose, onSuccess }) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (pin === '1234') {
      onSuccess();
    } else {
      setError('비밀번호가 틀렸습니다.');
      setPin('');
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h2 className="chalk-text" style={{ color: 'var(--chalk-yellow)', marginBottom: '20px' }}>교사 모드 진입</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            className="chalk-input"
            placeholder="PIN 번호 (1234)"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            autoFocus
          />
          {error && <p className="chalk-text" style={{ color: 'var(--chalk-pink)', fontSize: '1rem' }}>{error}</p>}
          <div style={{ marginTop: '30px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
            <button type="button" className="chalk-button" onClick={onClose}>취소</button>
            <button type="submit" className="chalk-button">확인</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TeacherModeModal;
