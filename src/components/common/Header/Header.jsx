import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch.jsx';
import Logo from '../../../assets/Logo.svg';
import CurrentUserContext from '../../../contexts/CurrentUserContext.js';

function Header({
  onAddClothes,
  city,
  isLoggedIn,
  onRegisterClick,
  onLoginClick,
}) {
  const currentUser = useContext(CurrentUserContext);
  const now = new Date();
  const date = now.toLocaleString('en-US', { month: 'long', day: 'numeric' });
  const location = city || 'Unknown';

  const getInitial = () => {
    return currentUser?.name ? currentUser.name.charAt(0).toUpperCase() : '?';
  };

  return (
    <header className="header">
      <div className="header__left">
        <Link to="/">
          <img src={Logo} alt="App Logo" className="header__logo" />
        </Link>
        <span className="header__date-location">
          {date}, {location}
        </span>
      </div>

      <div className="header__right">
        <ToggleSwitch />

        {isLoggedIn ? (
          <>
            <button
              className="header__add-clothes"
              title="Add new clothing item"
              onClick={onAddClothes}
            >
              + Add clothes
            </button>
            <Link to="/profile" className="header__profile-link">
              <span className="header__user-name" title="User Name">
                {currentUser?.name}
              </span>
              {currentUser?.avatar ? (
                <img
                  src={currentUser.avatar}
                  alt="User Avatar"
                  className="header__profile-photo"
                />
              ) : (
                <div className="header__avatar-placeholder">{getInitial()}</div>
              )}
            </Link>
          </>
        ) : (
          <>
            <button className="header__auth-btn" onClick={onRegisterClick}>
              Sign Up
            </button>
            <button className="header__auth-btn" onClick={onLoginClick}>
              Log In
            </button>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
