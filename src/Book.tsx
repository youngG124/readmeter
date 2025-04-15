import React from 'react';

interface BookProps {
  title: string;
  total: number;
  now : number;
}

const Book: React.FC<BookProps> = ({ title, total, now }) => {
    const progress = (now / total) * 100;

    return (
        <div style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem', borderRadius: '8px' }}>
        <h2>{title}</h2>
        <p>완독률: {progress.toFixed(1)}% ({now} / {total})</p>
        <div style={{ backgroundColor: '#eee', borderRadius: '4px', overflow: 'hidden' }}>
            <div
            style={{
                width: `${progress}%`,
                backgroundColor: '#4caf50',
                height: '10px',
                transition: 'width 0.3s ease-in-out'
            }}
            />
        </div>
        </div>
    );
};

export default Book;