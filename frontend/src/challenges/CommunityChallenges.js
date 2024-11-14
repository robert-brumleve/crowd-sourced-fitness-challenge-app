import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import ChallengeList from "../components/ChallengesList";
import TableHeader from "../components/TableHeader";
import challengeURL from "../data/challengeURL";

const AllChallenges = () => {
  // const calculateDaysLeft = (created_at, duration) => {
  //   const createdDate = new Date(created_at);
  //   const endDate = new Date(createdDate);
  //   endDate.setDate(createdDate.getDate() + duration);

  //   const currentDate = new Date();
  //   const timeDifference = endDate - currentDate;
  //   return Math.ceil(timeDifference / (1000 * 3600 * 24));
  // };

  const [challenges, setChallenges] = useState([]);

  useEffect(() => {
    axios
      .get(`${challengeURL}`)
      .then((res) => setChallenges(res.data))
      .catch((err) => console.log(err));
  }, []);

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
      <Header header="COMMUNITY CHALLENGES" />
      <div className="d-flex justify-content-end">
        <Link to="/challenges/create" className="btn btn-outline-success">
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
                  key={item.challengeID}
                  challengeID={item.challengeID}
                  type={item.type}
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

export default AllChallenges;
