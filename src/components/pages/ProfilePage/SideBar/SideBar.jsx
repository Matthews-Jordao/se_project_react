import React, { useContext } from 'react';
import './SideBar.css';
import CurrentUserContext from '../../../../contexts/CurrentUserContext.js';

function SideBar({ onEditClick, onLogoutClick }) {
  const currentUser = useContext(CurrentUserContext);

  const getInitial = () => {
    return currentUser?.name ? currentUser.name.charAt(0).toUpperCase() : '?';
  };

  return (
    <div className="sidebar">
      <div className="sidebar__user-info">
        {currentUser?.avatar ? (
          <img
            src={currentUser.avatar}
            alt="User Avatar"
            className="sidebar__avatar"
          />
        ) : (
          <div className="sidebar__avatar-placeholder">{getInitial()}</div>
        )}
        <p className="sidebar__username">{currentUser?.name}</p>
      </div>

      <div className="sidebar__buttons">
        <button
          className="sidebar__btn sidebar__btn--edit"
          onClick={onEditClick}
        >
          Change profile data
        </button>
        <button
          className="sidebar__btn sidebar__btn--logout"
          onClick={onLogoutClick}
        >
          Log out
        </button>
      </div>
    </div>
  );
}

export default SideBar;
