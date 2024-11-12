import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";

const Challenge = (props) => {
  return (
    <div>
      <Header header="CHALLENGE DETAIL" />
      <div className="card mx-auto" style={{ width: "45rem" }}>
        <div className="card-body">
          <h5 class="card-title">{props.name}</h5>
          <p className="card-text">{props.description}</p>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">Level: {props.difficulty}</li>
          <li class="list-group-item">Creator: {props.creatorID}</li>
          <li class="list-group-item">Image URL: {props.imageURL}</li>
        </ul>
        <div class="card-body">
          <Link
            to={`/challenges/update/${props.challengeID}`}
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

export default Challenge;
