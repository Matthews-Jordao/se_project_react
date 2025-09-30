import React from 'react';
import './ClothesSection.css';
import ItemCard from '../ItemCard/ItemCard.jsx';

// Clothes section component for profile page
// Shows all clothing items with add button
function ClothesSection({ clothingItems, onItemClick, onAddClothes }) {
  return (
    <div className="clothes-section">
      <div className="clothes-section__header">
        <p className="clothes-section__title">Your items</p>
        <button 
          className="clothes-section__add-button" 
          onClick={onAddClothes}
          title="Add new clothing item"
        >
          + Add new
        </button>
      </div>
      <div className="clothes-section__items">
        {clothingItems && clothingItems.length > 0 ? (
          clothingItems.map(item => (
            <ItemCard key={item._id} item={item} onClick={onItemClick} />
          ))
        ) : (
          <p className="clothes-section__empty">No items yet. Add your first clothing item!</p>
        )}
      </div>
    </div>
  );
}

export default ClothesSection;