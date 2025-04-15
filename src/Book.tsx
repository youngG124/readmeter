import React, { useRef } from 'react';

interface BookProps {
  title: string;
  total: number;
  now : number;
  onChangeNow: (newNow: number) => void;
}

const Book: React.FC<BookProps> = ({ title, total, now, onChangeNow }) => {
    const progress = (now / total) * 100;
    const barRef = useRef<HTMLDivElement>(null);

    const handleClickOrDrag = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!barRef.current) return;
    
        const rect = barRef.current.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        const newProgressRatio = Math.max(0, Math.min(offsetX / rect.width, 1));
        const newNow = Math.round(newProgressRatio * total);
        onChangeNow(newNow);
    };
    
    return (
        <div style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem', borderRadius: '8px' }}>
          <h2>{title}</h2>
          <p>완독률: {progress.toFixed(1)}% ({now} / {total})</p>
          <div
            ref={barRef}
            onMouseDown={handleClickOrDrag}
            onMouseMove={(e) => {
              if (e.buttons === 1) handleClickOrDrag(e); // 마우스 왼쪽 버튼이 눌려 있을 때만
            }}
            style={{
              backgroundColor: '#eee',
              borderRadius: '4px',
              overflow: 'hidden',
              height: '10px',
              cursor: 'pointer',
              position: 'relative',
            }}
          >
            <div
              style={{
                width: `${progress}%`,
                backgroundColor: '#4caf50',
                height: '100%',
                transition: 'width 0.1s ease-out',
              }}
            />
          </div>
        </div>
      );
};

export default Book;