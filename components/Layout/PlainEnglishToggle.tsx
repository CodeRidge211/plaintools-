'use client';

import { useState, useEffect } from 'react';

export default function PlainEnglishToggle() {
  const [isPlain, setIsPlain] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('plain-english-mode') === 'true';
    setIsPlain(saved);
    if (saved) {
      document.body.classList.add('plain-english-mode');
    }
  }, []);

  const toggle = () => {
    const newVal = !isPlain;
    setIsPlain(newVal);
    localStorage.setItem('plain-english-mode', newVal.toString());
    if (newVal) {
      document.body.classList.add('plain-english-mode');
    } else {
      document.body.classList.remove('plain-english-mode');
    }
  };

  return (
    <button 
      onClick={toggle}
      className={`btn ${isPlain ? 'btn-primary' : 'btn-secondary'}`}
      style={{ padding: '0.4rem 0.8rem', fontSize: '13px', borderRadius: '20px' }}
      title={isPlain ? 'Turn off helper text' : 'Show helper text and easy explanations'}
    >
      {isPlain ? '✨ Plain English ON' : 'Help? Plain English Mode'}
    </button>
  );
}
