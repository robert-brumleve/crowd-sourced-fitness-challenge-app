import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import ChallengeList from "../components/ChallengesList";
import TableHeader from "../components/TableHeader";
import challengeURL from "../data/challengeURL";

const AllChallenges = () => {
  const [challenges, setChallenges] = useState([]);
  const [filteredChallenges, setFilteredChallenges] = useState([]);

  useEffect(() => {
    axios
      .get(`${challengeURL}`)
      .then((res) => {
        setChallenges(res.data);
        setFilteredChallenges(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const Filter = (event) => {
    let keyword = event.target.value.toLowerCase();
    setFilteredChallenges(
      challenges.filter(
        (c) =>
          c.name.toLowerCase().includes(keyword) ||
          c.type.toLowerCase().includes(keyword)
      )
    );
  };

  return (
    <div className="border p-3">
      <Header header="COMMUNITY CHALLENGES" />
      <div className="d-flex justify-content-between align-items-center mb-3">
        <input
          type="text"
          className="form-control"
          onChange={Filter}
          placeholder="Search by name or type"
          style={{ width: "300px", marginBottom: "20px" }}
        />
        <Link to="/challenges/create" className="btn btn-outline-success">
          ADD NEW CHALLENGE
        </Link>
      </div>
      <div className="table-responsive">
        <table className="table table-sm table-bordered table-hover">
          <TableHeader />
          <tbody>
            {filteredChallenges.map((item) => {
              return (
                <ChallengeList
                  key={item.challengeID}
                  challengeID={item.challengeID}
                  type={item.type}
                  name={item.name}
                  difficulty={item.difficulty}
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
