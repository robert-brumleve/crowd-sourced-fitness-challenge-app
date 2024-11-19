import React from "react";
import Greeting from "./Greeting";

function Header(props) {
  return (
    // <header className="text-center">
    //   <h1>{props.header}</h1>
    // </header>

    <div className="d-flex justify-content-between align-items-center p-3">
      <div className="mx-auto">
        <h1>{props.header}</h1>
      </div>
      <Greeting />
    </div>
  );
}

export default Header;
