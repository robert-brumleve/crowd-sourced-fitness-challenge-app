// require("dotenv").config();
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import ChallengeList from "../components/ChallengesList";
import url from "../components/Backend_URL";


const AllChallenges = () => {
  const [challenges, setChallenges] = useState([]);
  const [filteredChallenges, setFilteredChallenges] = useState([]);
  // const [sorting, setSorting] = useState({ field: 'name', ascending: false })

  useEffect(() => {
    axios
      .get(`${url}/challenges`)
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
        <div className="row g-3">
          {filteredChallenges.map((item) => (
            <div
              key={item.challengeID}
              className="col-lg-2 col-md-3 col-sm-6 col-12"
            >
              <ChallengeList
                challengeID={item.challengeID}
                imageURL={item.imageURL}
                type={item.type}
                name={item.name}
                difficulty={item.difficulty}
                description={item.description}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllChallenges;
