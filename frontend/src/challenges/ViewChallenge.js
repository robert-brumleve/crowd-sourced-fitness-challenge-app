import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import Challenge from "../components/Challenge";
import challengeURL from "../data/challengeURL";

const ViewChallenge = () => {
  // Get the challengeID from the URL parameters
  const navigate = useNavigate();
  const { id } = useParams();
  const [challenge, setChallenge] = useState([]);
  const [isAuthorized, setIsAuthorized] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const { created_at } = challenge;
  const date = new Date(created_at);
  const formattedDate = created_at ? date.toISOString().split("T")[0] : "";

  const userInfo = {
    username: localStorage.getItem("username"),
    userID: localStorage.getItem("userID"),
  };

  useEffect(() => {
    // Get challenge data based on the ID
    console.log("userID from localStorage:", userInfo.userID);
    axios
      .get(`${challengeURL}/view/${id}`)
      .then((res) => {
        console.log(res);
        setChallenge(res.data[0]);
        if (Number(res.data[0].creatorID) !== Number(userInfo.userID)) {
          // console.log("userInfo.userID", typeof userInfo.userID);
          // console.log("res.data[0].creatorID", typeof res.data[0].creatorID);
          setIsAuthorized(false);
        } else {
          setIsAuthorized(true);
        }
      })
      .catch((err) => console.log(err));
  }, [id]);

  useEffect(() => {
    console.log("check authorized 2:", isAuthorized);
  }, [isAuthorized]);

  const handleUpdateClick = () => {
    if (!isAuthorized) {
      // Show error message and prevent navigation
      setErrorMessage("You are not authorized to update this challenge.");
    } else {
      setErrorMessage(null);
      navigate(`/challenges/update/${challenge.challengeID}`);
    }
  };

  return (
    <div>
      {challenge ? (
        <Challenge
          key={challenge.challengeID}
          challengeID={challenge.challengeID}
          name={challenge.name}
          description={challenge.description}
          type={challenge.type}
          difficulty={challenge.difficulty}
          creatorID={challenge.creatorID}
          username={challenge.username}
          imageURL={challenge.imageURL}
          created_at={formattedDate}
          tags={challenge.tags}
          handleUpdateClick={handleUpdateClick}
          errorMessage={errorMessage}
        />
      ) : (
        <div>
          <p>No challenge available. Create a new one</p>
          <Link to="/challenges/create" className="btn btn-primary btn-sm mx-2">
            CREATE
          </Link>
        </div>
      )}
      ;
    </div>
  );
};

export default ViewChallenge;
