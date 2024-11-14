import React from "react";
import { Link } from "react-router-dom";

const ChallengeList = (props) => {
  return (
    <tr key={props.challengeID} className="text-center">
      {/* <th scope="row">{props.challengeID}</th> */}
      <td className="text-center" style={{ width: "12%" }}>
        {props.name}
      </td>
      <td className="text-center" style={{ width: "12%" }}>
        {props.type}
      </td>
      <td className="text-center" style={{ width: "12%" }}>
        {props.difficulty}
      </td>
      <td style={{ width: "20%" }}>
        <Link
          to={`/challenges/view/${props.challengeID}`}
          className="btn btn-outline-info btn-sm"
        >
          VIEW
        </Link>
        <button
          className="btn btn-outline-danger btn-sm mx-2"
          onClick={() => props.handleDelete(props.challengeID)}
        >
          DELETE
        </button>
      </td>
    </tr>
  );
};

export default ChallengeList;
