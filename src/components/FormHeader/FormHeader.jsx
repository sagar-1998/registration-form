import React from "react";
import "./FormHeader.scss";
const FormHeader = (props) => {
  const { styles, title, subTitle } = props;
  return (
    <div className="FormHeader" style={{ ...styles }}>
      <h1 className="main-heading">{title}</h1>
      <h3 className="sub-heading">{subTitle}</h3>
    </div>
  );
};

export default FormHeader;
