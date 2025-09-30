
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch.jsx';

// Header component for the top navigation bar
// Now supports opening the Add Garment modal via a prop and temperature unit toggle
function Header({ onAddClothes, city }) {
  // Dynamic date
  const now = new Date();
  const date = now.toLocaleString('en-US', { month: 'long', day: 'numeric' });
  const location = typeof city === 'string' && city.length > 0 ? city : 'Unknown';
  const userName = 'John Doe';

  return (
    <header className="header">
      {/* Left section: Logo and Date/Location */}
      <div className="header__left">
        <Link to="/">
          <img src="/src/assets/Logo.svg" alt="App Logo" className="header__logo" />
        </Link>
        <span className="header__date-location">{date}, {location}</span>
      </div>
      {/* Right section: Add Clothes Button, Temperature Toggle, User Name, Avatar */}
      <div className="header__right">
        <ToggleSwitch />
        <button className="header__add-clothes" title="Add new clothing item" onClick={onAddClothes}>+ Add clothes</button>
        <Link to="/profile" className="header__profile-link">
          <span className="header__user-name" title="User Name">{userName}</span>
          <img src="/src/assets/Avatar.svg" alt="User Avatar" className="header__profile-photo" />
        </Link>
      </div>
    </header>
  );
}

export default Header;
