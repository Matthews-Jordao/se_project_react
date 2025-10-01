import React from 'react';
import './ItemCard.css';

function ItemCard({ item, onClick }) {
  const imageUrl = item?.link || item?.imageUrl; // Handle both property names
  
  return (
    <div
      className="item-card"
      onClick={() => onClick(item)}
      style={{
        backgroundImage: `url('${imageUrl}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="item-card__name-wrapper">
        <span className="item-card__name">{item?.name || 'Unnamed Item'}</span>
      </div>
    </div>
  );
}

export default ItemCard;
