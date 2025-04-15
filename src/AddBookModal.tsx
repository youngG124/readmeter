// src/components/BookModal.tsx
import React, { useState } from 'react';

interface AddBookModalProps {
  onClose: () => void;
  onSave: (title: string, total: string, yearMonth: string) => void;
}

const AddBookModal: React.FC<AddBookModalProps> = ({ onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [total, setTotal] = useState('');
  const [yearMonth, setYearMonth] = useState('');

  const handleSubmit = () => {
    if (!title || !total) return;
    onSave(title, total, yearMonth);
    onClose();
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 999,
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: 'rgb(99, 168, 217)',
          padding: '2rem',
          borderRadius: '8px',
          minWidth: '200px',
        }}
      >
        <h2>📖 새 책 추가</h2>
        <input
          type="text"
          placeholder="책 제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ display: 'block', marginBottom: '0.5rem', width: '100%', textAlign: 'center' }}
        />
        <input
          type="text"
          placeholder="총 페이지 수"
          value={total}
          onChange={(e) => setTotal(e.target.value)}
          style={{ display: 'block', marginBottom: '0.5rem', width: '100%', textAlign: 'center' }}
        />
        <input
          type="text"
          placeholder="시작 월(ex : 2503)"
          value={yearMonth}
          onChange={(e) => setYearMonth(e.target.value)}
          style={{ display: 'block', marginBottom: '1rem', width: '100%', textAlign: 'center' }}
        />
        <div style={{ textAlign: 'center' }}>
          <button onClick={handleSubmit} style={{ marginRight: '0.5rem' }}>Add</button>
          <button onClick={onClose}>Cancel</button>
        </div>        
      </div>
    </div>
  );
};

export default AddBookModal;