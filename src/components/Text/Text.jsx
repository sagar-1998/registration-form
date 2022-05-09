import React from "react";
import "./Text.scss";
const Text = (props) => {
  const { text, styles } = props;
  return (
    <>
      <p className="Text" style={{ ...styles }}>
        {text}
      </p>
    </>
  );
};

export default Text;
