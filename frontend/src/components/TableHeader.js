import React from "react";

const TableHeader = () => {
  return (
    <thead>
      <tr>
        {/* <th scope="col" className="text-center col-sm-1">
          ID
        </th> */}
        <th scope="col" className="text-center col-sm-1">
          Name
        </th>
        <th scope="col" className="text-center col-sm-1">
          Type
        </th>
        <th scope="col" className="text-center col-sm-1">
          Difficulty
        </th>
        <th scope="col" className="text-center col-sm-1">
          Duration
        </th>
        {/* <th scope="col" className="text-center col-sm-1">
          Days left
        </th> */}
        <th scope="col" className="text-center col-sm-1">
          Action
        </th>
      </tr>
    </thead>
  );
};

export default TableHeader;
