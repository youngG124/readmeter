import { useEffect, useState } from 'react';
import Book from './Book.tsx'
import AddBookModal from './AddBookModal.tsx';

interface BookData {
  title: string;
  total: number;
  now: number;
  yearMonth: string;
}

function App() {
  const [books, setBooks] = useState<BookData[]>([]);
  const [initialized, setInitialized] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('books');
    if (saved) {
      setBooks(JSON.parse(saved));
    }
    setInitialized(true);
  }, []);

  useEffect(() => {
    if (initialized) {
      localStorage.setItem('books', JSON.stringify(books));
    }    
  }, [books]);

  const handleAddBook = (title: string, total:string, yearMonth: string) => {
    if (!title || !total) return;
    const newBook: BookData = {
      title,
      total:Number(total),
      now:0,
      yearMonth,
    };
    setBooks((prev) => [...prev, newBook]);
  };

  const updateNow = (index: number, newNow: number) => {
    setBooks(prev =>
      prev.map((book, i) =>
        i === index ? { ...book, now: newNow } : book
      )
    );
  };

  return (
    <div style={{ padding: '0 2rem 2rem 2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Readmeter📚 4월</h1>

        {/* 메뉴 버튼 */}
        <div
          onClick={() => setShowModal(true)}
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '10px',
            cursor: 'pointer',
            width: '40px',
            height: '40px',
          }}
        >
          <div style={{ height: '3px', backgroundColor: '#888', borderRadius: '2px' }} />
          <div style={{ height: '3px', backgroundColor: '#888', borderRadius: '2px' }} />
          <div style={{ height: '3px', backgroundColor: '#888', borderRadius: '2px' }} />
        </div>
      </div>

      {books.map((book, index) => (
        <Book key={index} title={book.title} total={Number(book.total)} now={Number(book.now)} 
        onChangeNow={(newNow) => updateNow(index, newNow)}
        onDelete={() => {
          setBooks(prev => prev.filter((_, i) => i !== index));
        }} />
      ))}

      {showModal && (
        <AddBookModal
          onSave={handleAddBook}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  )
}

export default App