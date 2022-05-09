import React from "react";
import "./Header.scss";
import Logo from "../../assets/svgs/logo.svg";

const Header = (props) => {
  const { styles } = props;
  return (
    <div className="Header" style={{ ...styles }}>
      <img className="logo" src={Logo} alt="" />
    </div>
  );
};

export default Header;
