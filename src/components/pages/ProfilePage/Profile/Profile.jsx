import React from 'react';
import './Profile.css';
import SideBar from '../SideBar/SideBar';
import ClothesSection from '../ClothesSection/ClothesSection';

function Profile({ clothingItems, onItemClick, onAddClothes }) {
  return (
    <>
      <div className="profile">
        <section className="profile__sidebar">
          <SideBar />
        </section>
        <section className="profile__clothing-section">
          <ClothesSection 
            clothingItems={clothingItems}
            onItemClick={onItemClick}
            onAddClothes={onAddClothes}
          />
        </section>
      </div>
    </>
  );
}

export default Profile;
