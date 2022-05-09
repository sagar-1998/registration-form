import React from "react";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import "./Input.scss";
const Input = (props) => {
  const {
    minLength,
    maxLength,
    handleOnInput,
    disabled,
    id,
    required = false,
    title,
    defaultValue,
    placeholder,
    inputType = "text",
    pattern,
    isError = false,
    errorMessage,
    styles,
    setValue,
  } = props;
  const handleInputChange = (e) => {
    e.preventDefault();
    setValue(e.target.value);
  };
  const handleInput = (e) => {
    handleOnInput && handleOnInput(e);
  };
  return (
    <>
      <input
        minLength={minLength}
        maxLength={maxLength}
        onInput={handleInput}
        id={id || ""}
        disabled={disabled}
        required={required}
        title={title}
        defaultValue={defaultValue}
        type={inputType}
        className={`Input ${isError ? "invalid" : ""}`}
        placeholder={placeholder}
        style={{ ...styles }}
        pattern={pattern && pattern}
        onChange={handleInputChange}
      />
      <ErrorMessage
        showError={isError}
        message={errorMessage && errorMessage}
      />
    </>
  );
};

export default Input;
