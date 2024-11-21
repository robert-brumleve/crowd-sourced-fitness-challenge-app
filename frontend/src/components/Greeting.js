import React from "react";

const Greeting = () => {
  const username = localStorage.getItem("username");
  //console.log("localStorage", localStorage);

  return <h4>Hello, {username ? username : "Guest"}!</h4>;
};

export default Greeting;
