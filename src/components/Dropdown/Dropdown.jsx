import React from "react";
import "./Dropdown.scss";
const Dropdown = (props) => {
  const { disabled, hideArrow = false, styles, options, setValue } = props;
  const handleDropdownChange = (e) => {
    setValue(e.target.value);
  };
  return (
    <select
      disabled={disabled}
      className="Dropdown"
      style={{
        ...styles,
        background: hideArrow && "transparent",
      }}
      onChange={handleDropdownChange}
    >
      {options.map((option, index) => (
        <option className="dropdown-options" value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
