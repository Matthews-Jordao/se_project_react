import React from 'react';
import './ClothesSection.css';
import ItemCard from '../../../common/ItemCard/ItemCard';

function ClothesSection({ clothingItems, onItemClick, onAddClothes }) {
  return (
    <div className="clothes-section">
      <div className="clothes-section__header">
        <p className="clothes-section__title">Your items</p>
        <button 
          className="clothes-section__add-button" 
          onClick={onAddClothes}
        >
          + Add new
        </button>
      </div>
      <div className="clothes-section__items">
        {clothingItems.map((item) => (
          <ItemCard
            key={item._id}
            item={item}
            onItemClick={onItemClick}
          />
        ))}
      </div>
    </div>
  );
}

export default ClothesSection;
