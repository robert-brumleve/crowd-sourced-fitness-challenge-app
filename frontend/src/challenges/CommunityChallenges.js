// require("dotenv").config();
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import ChallengeList from "../components/ChallengesList";
import url from "../components/Backend_URL";
import Pagination from "../components/Pagination";
import Select from "react-select";
import types from "../data/types";

const AllChallenges = () => {
  const [challenges, setChallenges] = useState([]);
  const [filteredChallenges, setFilteredChallenges] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 12;
  const [selectedType, setSelectedType] = useState([]);

  useEffect(() => {
    axios
      .get(`${url}/challenges`)
      .then((res) => {
        setChallenges(res.data);
        setFilteredChallenges(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // live filter challenge by input
  const FilterByName = (event) => {
    let keyword = event.target.value.toLowerCase();
    setFilteredChallenges(
      challenges.filter((c) => c.name.toLowerCase().includes(keyword))
    );
  };

  // drop down select for specific type
  const FilterByType = (selectedOption) => {
    setSelectedType(selectedOption);
    if (selectedOption) {
      setFilteredChallenges(
        challenges.filter((c) => c.type === selectedOption.label)
      );
    } else {
      setFilteredChallenges(challenges);
    }
  };

  // pagination
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = filteredChallenges.slice(firstPostIndex, lastPostIndex);

  console.log("lastPostIndex", lastPostIndex);
  console.log("firstPostIndex", firstPostIndex);
  console.log("currentPosts", currentPosts);
  console.log("filteredChallenges", filteredChallenges);

  return (
    <div className="border p-3">
      <Header header="COMMUNITY CHALLENGES" />
      <div className="d-flex justify-content-between align-items-center mb-3">
        <input
          type="text"
          className="form-control"
          onChange={FilterByName}
          placeholder="Search by name"
          style={{ width: "300px", marginBottom: "20px" }}
        />

        <Select
          options={types}
          onChange={FilterByType}
          isClearable
          placeholder="Filter by type"
          value={selectedType}
        />

        <Link to="/challenges/create" className="btn btn-outline-success">
          ADD NEW CHALLENGE
        </Link>
      </div>
      <div className="table-responsive">
        <div className="row g-3">
          {currentPosts.map((item) => (
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
          <Pagination
            totalPosts={filteredChallenges.length}
            postsPerPage={postsPerPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default AllChallenges;
