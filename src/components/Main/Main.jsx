import React from 'react';
import './Main.css';

function Main({ children }) {
  return (
    <main className="main">
      {children}
    </main>
  );
}

export default Main;
