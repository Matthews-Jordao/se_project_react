import React, { useContext } from 'react';
import './ClothesSection.css';
import ItemCard from '../../../common/ItemCard/ItemCard';
import CurrentUserContext from '../../../../contexts/CurrentUserContext.js';

function ClothesSection({ clothingItems, onItemClick, onAddClothes, onCardLike, isLoggedIn }) {
  const currentUser = useContext(CurrentUserContext);
  const userItems = clothingItems.filter((item) => item.owner === currentUser?._id);

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
        {userItems.map((item) => (
          <ItemCard
            key={item._id}
            item={item}
            onClick={onItemClick}
            onCardLike={onCardLike}
            isLoggedIn={isLoggedIn}
          />
        ))}
      </div>
    </div>
  );
}

export default ClothesSection;
