import React from 'react';
import './Profile.css';
import SideBar from '../SideBar/SideBar.jsx';
import ClothesSection from '../ClothesSection/ClothesSection.jsx';

// Profile page component
// Shows user sidebar and all clothing items
function Profile({ clothingItems, onItemClick, onAddClothes }) {
  return (
    <div className="profile">
      <SideBar />
      <ClothesSection 
        clothingItems={clothingItems}
        onItemClick={onItemClick}
        onAddClothes={onAddClothes}
      />
    </div>
  );
}

export default Profile;