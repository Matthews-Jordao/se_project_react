import React from 'react';
import './ItemCard.css';

function ItemCard({ item, onClick }) {
  return (
    <div className="item-card" onClick={() => onClick(item)}>
      {/* Render item summary here */}
      <h4>{item?.name || 'Unnamed Item'}</h4>
    </div>
  );
}

export default ItemCard;
