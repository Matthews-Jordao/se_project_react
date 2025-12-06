import React, { useContext } from 'react';
import './ToggleSwitch.css';
import CurrentTemperatureUnitContext from '../../../contexts/CurrentTemperatureUnitContext.js';

function ToggleSwitch() {
  const { currentTemperatureUnit, handleToggleSwitchChange } = useContext(
    CurrentTemperatureUnitContext
  );

  return (
    <div className="temperature-toggle">
      <label className="temperature-toggle__container">
        <input
          type="checkbox"
          className="temperature-toggle__input"
          checked={currentTemperatureUnit === 'C'}
          onChange={handleToggleSwitchChange}
        />
        <div className="temperature-toggle__track">
          <span className="temperature-toggle__option temperature-toggle__option_fahrenheit">
            F
          </span>
          <span className="temperature-toggle__option temperature-toggle__option_celsius">
            C
          </span>
          <div className="temperature-toggle__selector"></div>
        </div>
      </label>
    </div>
  );
}

export default ToggleSwitch;
