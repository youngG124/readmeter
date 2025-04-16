import React, { useState } from 'react';

const MonthDropdown: React.FC = () => {
  const options = ['1월', '2월', '3월', '4월'];
  const [selected, setSelected] = useState(options[0]);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(prev => !prev);

  const handleSelect = (option: string) => {
    setSelected(option);
    setIsOpen(false);
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <div
        onClick={toggleDropdown}
        style={{
          cursor: 'pointer',
          fontWeight: 'bold',
          fontSize: '1.5rem',
          border: '1px solid #ccc',
          padding: '0.5rem 1rem',
          borderRadius: '5px',
          backgroundColor: 'white',
        }}
      >
        📚 {selected} ▾
      </div>

      {isOpen && (
        <ul
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            backgroundColor: 'white',
            border: '1px solid #ccc',
            boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
            borderRadius: '5px',
            marginTop: '5px',
            listStyle: 'none',
            padding: 0,
            zIndex: 999,
            minWidth: '100%',
          }}
        >
          {options.map((option, i) => (
            <li
              key={i}
              onClick={() => handleSelect(option)}
              style={{
                padding: '0.5rem 1rem',
                cursor: 'pointer',
                backgroundColor: selected === option ? '#f0f0f0' : 'white',
              }}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MonthDropdown;
