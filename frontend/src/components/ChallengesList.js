import React from "react";
import { Link } from "react-router-dom";
import { ViewIcon } from "./Icons";

const ChallengeList = (props) => {
  return (
    <tr key={props.challengeID} className="text-center">
      {/* <th scope="row">{props.challengeID}</th> */}
      <td className="text-center col-sm-3">
        {" "}
        <Link
          to={`/challenges/view/${props.challengeID}`}
          className="text-decoration-none"
        >
          {props.name}
        </Link>
        {props.errorMessage && (
          <div className="alert alert-danger">{props.errorMessage}</div>
        )}
        {/* commented out as + icon should not lead to chat room */}
        {/*
        <Link to={`/chatroom`} className="btn btn-outline-primary btn-sm">
          {PlusIcon}
        </Link>
        */}
        
      </td>
      <td className="text-center col-sm-1">{props.type}</td>
      <td className="text-center col-sm-1">{props.difficulty}</td>
    </tr>
  );
};

export default ChallengeList;
