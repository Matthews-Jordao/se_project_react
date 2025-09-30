import React from 'react';
import './SideBar.css';

// Sidebar component for user profile
// Shows user avatar and name side by side
function SideBar() {
  const userName = 'John Doe';

  return (
    <div className="sidebar">
      <img src="/src/assets/Avatar.svg" alt="User Avatar" className="sidebar__avatar" />
      <p className="sidebar__username">{userName}</p>
    </div>
  );
}

export default SideBar;