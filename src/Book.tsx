import React, { useRef } from 'react';

interface BookProps {
  title: string;
  total: number;
  now : number;
  onChangeNow: (newNow: number) => void;
  onDelete: () => void;
}

const Book: React.FC<BookProps> = ({ title, total, now, onChangeNow, onDelete }) => {
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
        <div style={{ border: '1px solid #ccc', padding: '0.3rem 1rem 1rem 1rem', marginBottom: '1rem', borderRadius: '8px', position: 'relative', }}>

        <button
                onClick={onDelete}
                style={{
                position: 'absolute',
                top: '8px',
                right: '8px',
                background: 'transparent',
                border: 'none',
                fontSize: '16px',
                cursor: 'pointer',
                color: '#888',
                }}
                title="delete"
            >
                ✕
            </button>

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