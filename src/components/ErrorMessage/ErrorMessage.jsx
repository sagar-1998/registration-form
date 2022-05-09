import React from "react";
import "./ErrorMessage.scss";
const ErrorMessage = (props) => {
  const { styles, showError = false, message, normalError } = props;
  return (
    <p
      className="ErrorMessage"
      style={{
        ...styles,
        display: showError ? "block" : "none",
        color: normalError && "gray",
      }}
    >
      {message && message}
    </p>
  );
};

export default ErrorMessage;
