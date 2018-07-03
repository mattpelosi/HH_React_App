import React from 'react'
import logo from "../assets/images/logo-symbol.svg";
import "../css/header.css";

function Header(){
  return (
    <React.Fragment>
      <div className="header">
        <div className="logo-container">
          <a href="http://www.helpfulhuman.com/">
            <img className="logo" src={logo} alt="logo" />
          </a>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Header;
