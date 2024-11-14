import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Challenge from "../components/Challenge";
import challengeURL from "../data/challengeURL";

const ViewChallenge = () => {
  // Get the challengeID from the URL parameters
  const { id } = useParams();
  const [challenge, setChallenge] = useState([]);
  const { created_at } = challenge;
  const date = new Date(created_at);
  const formattedDate = created_at ? date.toISOString().split("T")[0] : "";

  useEffect(() => {
    // Get challenge data based on the ID
    axios
      .get(`${challengeURL}/view/${id}`)
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
          key={challenge.challengeID}
          name={challenge.name}
          description={challenge.description}
          type={challenge.type}
          difficulty={challenge.difficulty}
          creatorID={challenge.creatorID}
          duration={challenge.duration}
          imageURL={challenge.imageURL}
          created_at={formattedDate}
          tags={challenge.tags}
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
