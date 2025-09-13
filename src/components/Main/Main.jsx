import React from 'react';
import './Main.css';
import ItemCard from '../ItemCard/ItemCard.jsx';

function Main({ clothingItems, onItemClick, weather }) {
  const temp = weather?.temperature;
  return (
    <main className="main">
      {typeof temp === 'number' && (
        <div className="main__title">
          Today is {Math.round(temp)}° F / You may want to wear:
        </div>
      )}
      {/* Render all clothing items */}
      {clothingItems && clothingItems.map(item => (
        <ItemCard key={item._id} item={item} onClick={onItemClick || (() => {})} />
      ))}
    </main>
  );
}

export default Main;
