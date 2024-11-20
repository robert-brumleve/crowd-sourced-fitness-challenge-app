import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";

const IsAuthorized = ({ userID, challengeID, children, errorMessage }) => {
  const [isAuthorized, setIsAuthorized] = useState(null); 
  const [challenge, setChallenge] = useState(null);

  useEffect(() => {
    // Fetch challenge details and verify authorization
    axios
      .get(`/challenges/view/${challengeID}`)
      .then((res) => {
        setChallenge(res.data[0]);
        if (Number(res.data[0].creatorID) === Number(userID)){
        setIsAuthorized(true)};
      })
      .catch((err) => {
        console.error(err);
        setIsAuthorized(false);
      });
  }, [challengeID, userID]);

  if (isAuthorized === null) {
    return <div>Loading...</div>; // Show a loading state
  }

  if (!isAuthorized) {
    return <div>{errorMessage || "You are not authorized to access this resource."}</div>;
  }

  return children({ challenge }); // Render children and pass challenge data
};

export default IsAuthorized;
