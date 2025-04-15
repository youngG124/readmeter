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
          backgroundColor: '#1e1e1e',
          color: '#fff',
          padding: '2rem',
          borderRadius: '10px',
          minWidth: '280px',
          maxWidth: '280px',
          boxShadow: '0 0 10px rgba(0,0,0,0.8)',
        }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>📖 Add New Book</h2>

        <input
          type="text"
          placeholder="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            backgroundColor: '#2e2e2e',
            color: '#fff',
            border: '1px solid #444',
            borderRadius: '4px',
            padding: '0.5rem',
            marginBottom: '0.5rem',
            width: '100%',
            textAlign: 'center',
          }}
        />
        <input
          type="text"
          placeholder="total page"
          value={total}
          onChange={(e) => setTotal(e.target.value)}
          style={{
            backgroundColor: '#2e2e2e',
            color: '#fff',
            border: '1px solid #444',
            borderRadius: '4px',
            padding: '0.5rem',
            marginBottom: '0.5rem',
            width: '100%',
            textAlign: 'center',
          }}
        />
        <input
          type="text"
          placeholder="year month (ex: 2504)"
          value={yearMonth}
          onChange={(e) => setYearMonth(e.target.value)}
          style={{
            backgroundColor: '#2e2e2e',
            color: '#fff',
            border: '1px solid #444',
            borderRadius: '4px',
            padding: '0.5rem',
            marginBottom: '1rem',
            width: '100%',
            textAlign: 'center',
          }}
        />
        <div style={{ textAlign: 'center' }}>
          <button
            onClick={handleSubmit}
            style={{
              marginRight: '0.5rem',
              padding: '0.4rem 1rem',
              backgroundColor: '#4caf50',
              border: 'none',
              color: 'white',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            add
          </button>
          <button
            onClick={onClose}
            style={{
              padding: '0.4rem 1rem',
              backgroundColor: '#555',
              border: 'none',
              color: 'white',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddBookModal;