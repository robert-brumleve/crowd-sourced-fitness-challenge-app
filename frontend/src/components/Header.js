import React from "react";

function Header(props) {
  return (
    <header className="text-center">
      <h1>{props.header}</h1>
    </header>
  );
}

export default Header;
