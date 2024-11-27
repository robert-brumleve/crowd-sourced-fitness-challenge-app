import React from "react";
import { Link } from "react-router-dom";

const ChallengeList = (props) => {
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
        <p className="card-text">
          {props.description.split(" ").slice(0, 10).join(" ")}
          {props.description.split(" ").length > 10 && "..."}
        </p>
        <p className="card-text">Type: {props.type}</p>
        <Link
          to={`/challenges/view/${props.challengeID}`}
          className="text-decoration-none"
        >
          View detail
        </Link>
      </div>
    </div>
  );
};

export default ChallengeList;
