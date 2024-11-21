import React from "react";
import { Link } from "react-router-dom";

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
      </td>
      <td className="text-center col-sm-1">{props.type}</td>
      <td className="text-center col-sm-1">{props.difficulty}</td>
    </tr>
  );
};

export default ChallengeList;
