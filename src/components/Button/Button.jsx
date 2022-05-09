import React from "react";
import "./Button.scss";
const Button = (props) => {
  const {
    styles,
    btnText,
    outline = false,
    handleButtonClick,
    isDisabled = false,
  } = props;

  const handleSubmit = (e) => {
    e.preventDefault();
    handleButtonClick();
  };
  return (
    <button
      className={`Button ${
        isDisabled ? "disabled" : `${outline ? "secondary" : "primary"}`
      }`}
      type="submit"
      style={{ ...styles }}
      onClick={handleSubmit}
    >
      {btnText}
    </button>
  );
};

export default Button;
