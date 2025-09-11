import React from 'react';
import './Main.css';
import ItemCard from '../ItemCard/ItemCard.jsx';

function Main({ clothingItems, onItemClick }) {
  return (
    <main className="main">
      {/* Render all clothing items */}
        {clothingItems && clothingItems.map(item => (
          <ItemCard key={item._id} item={item} onClick={onItemClick || (() => {})} />
        ))}
    </main>
  );
}

export default Main;
