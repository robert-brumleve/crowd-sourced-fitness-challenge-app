import React, { useEffect, useState } from "react";

const Greeting = () => {
  const username = localStorage.getItem("username");
  const userID = localStorage.getItem("userID");
  console.log("localStorage", localStorage);

  return <h4>Hello, {username ? username : "Guest"}!</h4>;
};

export default Greeting;
