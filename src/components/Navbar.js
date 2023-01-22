import React from "react";

function Navbar(props) {
    let navbarStyle = {
        backgroundColor : "white"
      }
  return (
    <nav className="navbar navbar-light" style={navbarStyle}>
      <span className="navbar-brand mb-0 h1">Leadzen.ai</span>
    </nav>
  );
}

export default Navbar;
