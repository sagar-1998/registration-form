import React from "react";
import "./ToggleButton.scss";
const ToggleButton = (props) => {
  const { styles } = props;
  return (
    <label className="switch" style={{ ...styles }}>
      <input type="checkbox" />
      <span className="slider"></span>
    </label>
  );
};

export default ToggleButton;
