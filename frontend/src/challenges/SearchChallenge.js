import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import ChallengeList from "../components/ChallengesList";
import TableHeader from "../components/TableHeader";
import challengeURL from "../data/challengeURL";

const Search = () => {
  const { keywords } = useParams();
  const [challenges, setChallenges] = useState([]);
  useEffect(() => {
    axios
      .get(`${challengeURL}/search/${keywords}`)
      .then((res) => {
        console.log(res);
        setChallenges(res.data);
      })
      .catch((err) => console.log(err));
  }, [keywords]);

  const handleDelete = (id) => {
    axios
      .delete(`${challengeURL}/delete/${id}`)
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
          <TableHeader />
          <tbody>
            {challenges.map((item) => {
              return (
                <ChallengeList
                  challengeID={item.challengeID}
                  name={item.name}
                  difficulty={item.difficulty}
                  handleDelete={handleDelete}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Search;
