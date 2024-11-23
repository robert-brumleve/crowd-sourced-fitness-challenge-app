import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import Challenge from "../components/Challenge";
import challengeURL from "../data/challengeURL";
import deleteChat from "../chat/components/DeleteChat";
import createUserChat from "../chat/components/CreateUserChat";

const ViewChallenge = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [challenge, setChallenge] = useState([]);
  const [isAuthorized, setIsAuthorized] = useState(true);
  const [errorUpdateMessage, setErrorUpdateMessage] = useState(null);
  const [errorDeleteMessage, setErrorDeleteMessage] = useState(null);
  const [errorJoinMessage, setErrorJoinMessage] = useState(null);
  const [hasJoined, setHasJoined] = useState(false); //tracj if join join a challenge
  const { created_at } = challenge;
  const date = new Date(created_at);
  const formattedDate = created_at ? date.toISOString().split("T")[0] : "";

  const userInfo = useMemo(
    () => ({
      username: localStorage.getItem("username"),
      userID: localStorage.getItem("userID"),
    }),
    []
  );

  useEffect(() => {
    // Get challenge data based on the ID
    console.log("userID from localStorage:", userInfo.userID);
    axios
      .get(`${challengeURL}/view/${id}`)
      .then((res) => {
        //console.log(res);
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
  }, [userInfo.userID, id]);

  // Get challenge data based on the userID
  // Then check if user has joined challenged already.
  useEffect(() => {
    if (userInfo.userID != null) {
      try{
        axios
        .get(
          `http://localhost:5000/dashboard/userchallenges/${userInfo.userID}`
        )
        .then((res) => {
          const items = res.data;
          items.forEach((item) => {
            if (Number(item.challengeID) === Number(id)) {
              //matching challengeid found in user
              setHasJoined(true);
              return;
            }
          });
        })
      }catch (error){
        console.log(error);
      }
      
    }
  }, [userInfo.userID, id, hasJoined, setHasJoined]);

  const handleJoinClick = () => {
    if (!userInfo.username || !userInfo.userID) {
      setErrorJoinMessage(
        <>
          You should log in to join this challenge. Click{" "}
          <Link to="/login">here</Link> to login.
        </>
      );
    } else {
      setErrorJoinMessage(null);

      // If user can join the challenge, add data to users_has_challenges table
      try {
        axios
          .post(`${challengeURL}/join`, {
            userID: userInfo.userID,
            challengeID: id,
            completed: "0",
          })
          .then(
            //include chat to the user in firebase
            createUserChat(userInfo.userID, challenge.challengeID, challenge.name)
          )
          .then(setHasJoined(true));
        // console.log(result.response.data);
      } catch (error) {
        console.error(error.response.data);
      }
    }
  };

  const handleUpdateClick = () => {
    if (!isAuthorized) {
      // Show error message and prevent navigation
      setErrorUpdateMessage("You are not authorized to update this challenge.");
    } else {
      setErrorUpdateMessage(null);
      navigate(`/challenges/update/${challenge.challengeID}`);
    }
  };

  const handleDeleteClick = () => {
    if (!isAuthorized) {
      // Show error message and prevent navigation
      setErrorDeleteMessage("You are not authorized to delete this challenge.");
    } else {
      const confirmed = window.confirm(
        "Are you sure you want to delete this challenge?"
      );
      if (!confirmed) return;
      setErrorDeleteMessage(null);
      axios
        .delete(`${challengeURL}/delete/${id}`)
        .then(deleteChat(id))
        .then(navigate("/challenges"))
        .catch((err) => console.log(err));
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
          handleDeleteClick={handleDeleteClick}
          handleJoinClick={handleJoinClick}
          errorUpdateMessage={errorUpdateMessage}
          errorDeleteMessage={errorDeleteMessage}
          errorJoinMessage={errorJoinMessage}
          hasJoined={hasJoined}
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
