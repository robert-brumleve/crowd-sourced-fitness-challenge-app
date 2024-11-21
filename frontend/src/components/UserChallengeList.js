import React from "react";

const UserChallengeList = (props) => {
  return (
    <tr key={props.userID} className="text-center">
      <td className="text-center col-sm-3">
        {props.userID}
      </td>
      <td className="text-center col-sm-1">
        {props.challengeID}
      </td>
      <td className="text-center col-sm-1">
        {props.name}
      </td>
    </tr>
  );
};

export default UserChallengeList;
