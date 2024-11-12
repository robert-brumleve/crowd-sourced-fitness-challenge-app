import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Header from "../components/Header";

const ViewChallenge = () => {
  // Get the challengeID from the URL parameters
  const { id } = useParams();
  const [challenge, setChallenge] = useState([]);
  useEffect(() => {
    // Get challenge data based on the ID
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
      <Header header="CHALLENGE DETAIL" />
      <div className="card mx-auto" style={{ width: "45rem" }}>
        <div className="card-body">
          <h5 class="card-title">{challenge.name}</h5>
          <p className="card-text">{challenge.description}</p>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">Level: {challenge.difficulty}</li>
          <li class="list-group-item">Creator: {challenge.creatorID}</li>
          <li class="list-group-item">Image URL: {challenge.imageURL}</li>
        </ul>
        <div class="card-body">
          <Link
            to={`/challenges/update/${challenge.challengeID}`}
            className="btn btn-info btn-sm"
          >
            Update
          </Link>
          <Link to="/challenges" className="btn btn-primary btn-sm mx-2">
            Back
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ViewChallenge;
