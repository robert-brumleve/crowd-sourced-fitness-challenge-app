import React from "react";
import { Link } from "react-router-dom";
import { TrashIcon, ExpandIcon} from "./Icons";

const ChallengeList = (props) => {
  return (
    <tr key={props.challengeID} className="text-center">
      {/* <th scope="row">{props.challengeID}</th> */}
      <td className="text-center col-sm-3">
        {props.name}
      </td>
      <td className="text-center col-sm-1">
        {props.type}
      </td>
      <td className="text-center col-sm-1">
        {props.difficulty}
      </td>
      <td className="text-center col-sm-1">
        <Link
          to={`/challenges/view/${props.challengeID}`}
          className="btn btn-outline-info btn-sm"
        >
          {ExpandIcon}
        </Link>    
        <button
          className="btn btn-outline-danger btn-sm mx-2"
          onClick={() => props.handleDelete(props.challengeID)}
        >
          {TrashIcon}
        </button>
      </td>
    </tr>
  );
};

export default ChallengeList;
