import React from "react";
import { Link } from "react-router-dom";
import { ViewIcon } from "./Icons";

const ChallengeList = (props) => {
  return (
    <tr key={props.challengeID} className="text-center">
      {/* <th scope="row">{props.challengeID}</th> */}
      <td className="text-center col-sm-3">{props.name}</td>
      <td className="text-center col-sm-1">{props.type}</td>
      <td className="text-center col-sm-1">{props.difficulty}</td>
      <td className="text-center col-sm-1">
        <Link
          to={`/challenges/view/${props.challengeID}`}
          className="btn btn-outline-info btn-sm"
        >
          {ViewIcon}
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
    </tr>
  );
};

export default ChallengeList;
