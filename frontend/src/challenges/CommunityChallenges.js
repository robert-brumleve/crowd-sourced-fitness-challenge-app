import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import ChallengeList from "../components/ChallengesList";
import TableHeader from "../components/TableHeader";
import challengeURL from "../data/challengeURL";

const AllChallenges = () => {
  const [challenges, setChallenges] = useState([]);

  useEffect(() => {
    axios
      .get(`${challengeURL}`)
      .then((res) => setChallenges(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="border p-3">
      <Header header="COMMUNITY CHALLENGES"/>
      <div className="d-flex justify-content-end">
        <Link to="/challenges/create" className="btn btn-outline-success">
          {/* {PlusIcon} */}
          CREATE NEW CHALLENGE
        </Link>
      </div>

      <div className="table-responsive">
        <table className="table table-sm table-bordered table-hover">
          <TableHeader />
          <tbody>
            {challenges.map((item) => {
              return (
                <ChallengeList
                  key={item.challengeID}
                  challengeID={item.challengeID}
                  type={item.type}
                  name={item.name}
                  difficulty={item.difficulty}
                  // handleDelete={handleDelete}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllChallenges;
