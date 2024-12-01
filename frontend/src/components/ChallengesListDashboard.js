import React from "react";
import { Link } from "react-router-dom";
const ChallengesListDashboard = (props) => {
  console.log("props", props);
  return (
    <div className="card" style={{ width: "18rem" }}>
      <img
        className="card-img-top"
        src={
          props.imageURL ||
          `${process.env.PUBLIC_URL}/img/defaultChallengeImg.png`
        }
        alt="Challenge Detail"
        style={{
          height: "10rem",
          width: "100%",
        }}
      />
      <div className="card-body">
        <h5 className="card-title">{props.name}</h5>
        <p className="card-text">Type: {props.type}</p>
        <Link to={`/challenges/view/${props.challengeID}`}>
          <button type="button" className="btn btn-sm btn-primary">
            View Detail
          </button>
        </Link>
        <button
          type="button"
          className={`btn btn-sm ${
            props.completed === 1 ? "btn-success" : "btn-outline-secondary"
          }`}
          onClick={() => props.handleCompleteClick(props.challengeID)}
        >
          {props.completed === 1 ? "Completed" : "Complete Challenge"}
        </button>
      </div>
    </div>
  );
};
export default ChallengesListDashboard;
