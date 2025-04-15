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
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('books');
    if (saved) {
      setBooks(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('books', JSON.stringify(books));
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

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h1>Readmeter📚</h1>
        <button onClick={() => setShowModal(true)} style={{ alignSelf: 'flex-end' }}>
          📘 책 추가하기
        </button>
      </div>

      {books.map((book, index) => (
        <Book key={index} title={book.title} total={Number(book.total)} now={Number(book.now)} />
      ))}

      {showModal && (
        <AddBookModal
          onSave={handleAddBook}
          onClose={() => setShowModal(false)}
        />
      )}

      <Book title="반항하는 인간" total={300} now={150}/>
      <Book title="엔트로피" total={327} now={117}/>
    </div>
  )
}

export default App