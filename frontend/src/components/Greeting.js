import React, { useEffect, useState } from "react";

const Greeting = () => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    console.log("Stored Username:", storedUsername);
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  return <h4>Hello, {username ? username : "Guest"}!</h4>;
};

export default Greeting;
