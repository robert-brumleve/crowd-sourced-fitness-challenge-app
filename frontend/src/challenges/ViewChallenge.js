import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Challenge from "../components/Challenge";

const ViewChallenge = () => {
  const { id } = useParams();
  const [challenge, setChallenge] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/challenges/view/${id}`)
      .then((res) => {
        console.log(res);
        setChallenge(res.data[0]);
      })
      .catch((err) => console.log(err));
  }, [id]);
  return (
    <div>
      {challenge ? (
        <Challenge
          challengeID={challenge.challengeID}
          name={challenge.name}
          description={challenge.description}
          difficulty={challenge.difficulty}
          creatorID={challenge.creatorID}
          imageURL={challenge.imageURL}
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
