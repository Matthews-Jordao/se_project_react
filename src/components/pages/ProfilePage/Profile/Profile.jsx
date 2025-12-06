import React from 'react';
import './Profile.css';
import SideBar from '../SideBar/SideBar';
import ClothesSection from '../ClothesSection/ClothesSection';

function Profile({ clothingItems, onItemClick, onAddClothes, onEditClick, onLogoutClick, onCardLike, isLoggedIn }) {
  return (
    <>
      <div className="profile">
        <section className="profile__sidebar">
          <SideBar 
            onEditClick={onEditClick}
            onLogoutClick={onLogoutClick}
          />
        </section>
        <section className="profile__clothing-section">
          <ClothesSection 
            clothingItems={clothingItems}
            onItemClick={onItemClick}
            onAddClothes={onAddClothes}
            onCardLike={onCardLike}
            isLoggedIn={isLoggedIn}
          />
        </section>
      </div>
    </>
  );
}

export default Profile;
