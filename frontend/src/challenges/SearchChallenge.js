import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import Challenge from "../components/Challenge";

const Search = () => {
  const { keywords } = useParams();
  const [challenges, setChallenges] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/challenges/search/${keywords}`)
      .then((res) => {
        console.log(res);
        setChallenges(res.data);
      })
      .catch((err) => console.log(err));
  }, [keywords]);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/api/challenges/delete/${id}`)
      .then((res) => {
        setChallenges((prevChallenges) =>
          prevChallenges.filter((challenge) => challenge.challengeID !== id)
        );
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="border p-3">
      <Header header="SEARCH RESULTS" />
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
                ID
              </th>
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
                <tr key={item.challengeID} className="text-center">
                  <th scope="row">{item.challengeID}</th>
                  <td style={{ width: "33.33%" }}>{item.name}</td>
                  <td className="text-center" style={{ width: "33.33%" }}>
                    {item.difficulty}
                  </td>
                  <td style={{ width: "33.33%" }}>
                    <Link
                      to={`/challenges/view/${item.challengeID}`}
                      className="btn btn-info btn-sm"
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

export default Search;
