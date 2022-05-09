import React from "react";
import "./Label.scss";
const Label = (props) => {
  const { labelFor, labelText, styles } = props;
  return (
    <>
      <label className="Label" htmlFor={labelFor} style={{ ...styles }}>
        {labelText}
      </label>
    </>
  );
};

export default Label;
