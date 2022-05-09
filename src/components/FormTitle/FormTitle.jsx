import React, { useEffect } from "react";
import "./FormTitle.scss";
const FormTitle = (props) => {
  const { titleText = "Title of the Form", message, styles, isWarning } = props;
  useEffect(() => {}, []);

  return (
    <div className="FormTitle" style={{ ...styles }}>
      <h2 className="form-heading">{titleText}</h2>
      <span className="form-heading-decoration"></span>
      {message && (
        <p className="form-message" style={{ color: isWarning && "red" }}>
          {message}
        </p>
      )}
    </div>
  );
};

export default FormTitle;
