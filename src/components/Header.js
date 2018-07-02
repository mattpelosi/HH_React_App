import React from "react";
import logo from "../assets/images/logo-symbol.svg";
import "../css/header.css";

class Header extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
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
  }
}

export default Header;
