import React from "react";

const TableHeader = () => {
  return (
    <thead>
      <tr>
        <th scope="col" className="text-center">
          Name
        </th>
        <th scope="col" className="text-center">
          Type
        </th>
        <th scope="col" className="text-center">
          Difficulty
        </th>        
      </tr>
    </thead>
  );
};

export default TableHeader;
