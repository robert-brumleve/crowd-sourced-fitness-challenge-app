import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// import Card from "../components/Card";
import Header from "../components/Header";

const AllChallenges = () => {
  const [challenges, setChallenges] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/challenges")
      .then((res) => setChallenges(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/api/challenges/delete/${id}`)
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container mt-4">
      <Header header="COMMUNITY CHALLENGES" />
      <div className="d-flex justify-content-end">
        <Link to="/challenges/create" className="btn btn-success">
          Create
        </Link>
      </div>

      <div className="table-responsive">
        <table className="table table-sm table-bordered table-hover">
          <thead>
            <tr>
              <th scope="col" className="text-center col-sm-1">
                Name
              </th>
              <th scope="col" className="text-center col-sm-1">
                Difficulty
              </th>
              <th scope="col" className="text-center col-sm-1">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {challenges.map((item) => {
              return (
                <tr key={item.challengeID}>
                  <td className="text-center" style={{ width: "33.33%" }}>
                    {item.name}
                  </td>
                  <td className="text-center" style={{ width: "33.33%" }}>
                    {item.difficulty}
                  </td>
                  <td className="text-center" style={{ width: "33.33%" }}>
                    <Link
                      to={`/challenges/view/${item.challengeID}`}
                      className="btn btn-info btn-sm"
                      // onClick={handleClick}
                    >
                      VIEW
                    </Link>
                    <Link
                      to={`/challenges/update/${item.challengeID}`}
                      className="btn btn-sm btn-primary mx-2"
                    >
                      UPDATE
                    </Link>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(item.challengeID)}
                    >
                      DELETE
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllChallenges;
