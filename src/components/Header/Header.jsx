
import React from 'react';
import './Header.css';

// Header component for the top navigation bar
// Header component for the top navigation bar
// Now supports opening the Add Garment modal via a prop
function Header({ onAddClothes }) {
  // Static data for demonstration
  const date = 'June 15';
  const location = 'New York';
  const userName = 'John Doe';

  return (
    <header className="header">
      {/* Left section: Logo and Date/Location */}
      <div className="header__left">
        <img src="/src/assets/Logo.svg" alt="App Logo" className="header__logo" />
        <span className="header__date-location">{date}, {location}</span>
      </div>
      {/* Right section: Add Clothes Button, User Name, Avatar */}
      <div className="header__right">
  <button className="header__add-clothes" title="Add new clothing item" onClick={onAddClothes}>+ Add clothes</button>
        <span className="header__user-name" title="User Name">{userName}</span>
        <img src="/src/assets/Avatar.svg" alt="User Avatar" className="header__profile-photo" />
      </div>
    </header>
  );
}

export default Header;
