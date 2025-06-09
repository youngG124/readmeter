import { useEffect, useState } from 'react';
import Book from './Book.tsx'
import AddBookModal from './AddBookModal.tsx';
import BookEdit from './BookEdit.tsx';

export interface BookData {
  title: string;
  total: number;
  now: number;
  yearMonth: string;
}

const today = new Date();
const getCurrentYear = (): number => today.getFullYear();
const getCurrentMonth = (): number => today.getMonth() + 1;
const getCurrentYearMonth = ():string => String(getCurrentYear()) + String(getCurrentMonth()).padStart(2, '0');

function App() {
  const [books, setBooks] = useState<BookData[]>([]);

  const [initialized, setInitialized] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [editingBookIndex, setEditingBookIndex] = useState<number | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  
  const [dropdownOpen, setDropdownOpen] = useState(false);

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
      yearMonth: yearMonth || getCurrentYearMonth(),
    };
    setBooks((prev) => [...prev, newBook]);
  };

  const handleSaveEdit = (title: string, yearMonth: string) => {
    if (editingBookIndex === null) return;
    setBooks(prev => {
      const updated = [...prev];
      updated[editingBookIndex] = { ...updated[editingBookIndex], title, yearMonth };
      return updated;
    });
    setEditingBookIndex(null);
    setShowEditModal(false);
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
      <div style={{ position: 'relative', display: 'flex', gap:'19px'}}>
        <h1 style={{ }}>Readmeter📚 </h1>
        <h1 onClick={() => setDropdownOpen(prev => !prev)} style={{ cursor: 'pointer' }}>
          {getCurrentMonth()}월
        </h1>

        {dropdownOpen && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          {/* 화살표 영역 */}
          <span style={{ fontSize: '1rem', color: 'white' }}>▶</span>

          {/* 드롭다운 본체 */}
          <ul
            style={{
              backgroundColor: 'black',
              color: 'black',
              border: '1px solid #ccc',
              boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
              borderRadius: '3px',
              padding: 0,
              listStyle: 'none',
              minWidth: '80px',
              textAlign: 'center',
            }}
          >
            <li style={dropdownItemStyle}>Last Month</li>
            <li style={dropdownItemStyle}>This Year</li>
            <li style={dropdownItemStyle}>Last Year</li>
          </ul>
        </div>
        )}
      </div>

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

      {/* 책 동적 할당 */}
      {books
      .filter(book => book.yearMonth === getCurrentYearMonth())
      .map((book, index) => (
        <Book
          key={index}
          title={book.title}
          total={Number(book.total)}
          now={Number(book.now)} 
          onChangeNow={(newNow) => updateNow(index, newNow)}
          onDelete={() => {
            setBooks(prev => prev.filter((_, i) => i !== index));
          }}
          onEdit={() => {
            console.log('onEdit');
            console.log(book);
            setEditingBookIndex(index);
            setShowEditModal(true);
          }}
        />
      ))}

      {showModal && (
        <AddBookModal
          onSave={handleAddBook}
          onClose={() => setShowModal(false)}
        />
      )}

      {showEditModal && editingBookIndex !== null && (
        <BookEdit
          book={books[editingBookIndex]}
          onClose={() => {
            setShowEditModal(false);
            setEditingBookIndex(null);
          }}
          onSave={handleSaveEdit}
        />
      )}

      
    </div>
  )
}

const dropdownItemStyle = {
  padding: '0.5rem',
  cursor: 'pointer',
  borderBottom: '1px solid #eee',
  fontSize: '0.75rem',
  backgroundColor: 'white',
  height: '15px',
  fontWeight: 'bold',
};

export default App