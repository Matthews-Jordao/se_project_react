
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch.jsx';

function Header({ onAddClothes, city }) {
  const now = new Date();
  const date = now.toLocaleString('en-US', { month: 'long', day: 'numeric' });
  const location = city || 'Unknown';
  const userName = 'John Doe';

  return (
    <header className="header">
      <div className="header__left">
        <Link to="/">
          <img src="/src/assets/Logo.svg" alt="App Logo" className="header__logo" />
        </Link>
        <span className="header__date-location">{date}, {location}</span>
      </div>
      
      <div className="header__right">
        <ToggleSwitch />
        <button className="header__add-clothes" title="Add new clothing item" onClick={onAddClothes}>
          + Add clothes
        </button>
        <Link to="/profile" className="header__profile-link">
          <span className="header__user-name" title="User Name">{userName}</span>
          <img src="/src/assets/Avatar.svg" alt="User Avatar" className="header__profile-photo" />
        </Link>
      </div>
    </header>
  );
}

export default Header;
