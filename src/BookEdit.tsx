import React, { useState } from 'react';
import { BookData } from './App.tsx'; // or types.ts

interface BookEditProps {
  book: BookData;
  onClose: () => void;
  onSave: (title: string, yearMonth: string) => void;
}

const BookEditModal: React.FC<BookEditProps> = ({ book, onClose, onSave }) => {
  const [title, setTitle] = useState(book.title);
  const [yearMonth, setYearMonth] = useState(book.yearMonth.toString());

  const handleSubmit = () => {
    if (!title || !yearMonth) return;
    onSave(title, yearMonth);
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
        style={{
          backgroundColor: '#1e1e1e',
          color: '#fff',
          padding: '24px',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
          width: '320px',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px', textAlign: 'center' }}>
          Edit Book
        </h2>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          style={{
            width: '100%',
            padding: '8px',
            marginBottom: '12px',
            border: '1px solid #ccc',
            borderRadius: '4px',
          }}
        />
        <input
          type="text"
          value={yearMonth}
          onChange={(e) => setYearMonth(e.target.value)}
          placeholder="YearMonth (e.g. 202504)"
          style={{
            width: '100%',
            padding: '8px',
            marginBottom: '20px',
            border: '1px solid #ccc',
            borderRadius: '4px',
          }}
        />
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
          <button
            onClick={handleSubmit}
            style={{
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Save
          </button>
          <button
            onClick={onClose}
            style={{
              backgroundColor: '#ccc',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookEditModal;