import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import ChallengeList from "../components/ChallengesList";
import url from "../components/Backend_URL";

const AllChallenges = () => {
  const [challenges, setChallenges] = useState([]);
  const [filteredChallenges, setFilteredChallenges] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(8);

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
    setCurrentPage(1); // Reset to the first page on filter change
  };

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = filteredChallenges.slice(firstPostIndex, lastPostIndex);

  const totalPages = Math.ceil(filteredChallenges.length / postsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
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
        </div>
      </div>
      <div className="pagination d-flex justify-content-center mt-3">
        <button
          className="btn btn-outline-primary mx-1"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`btn mx-1 ${
              currentPage === index + 1 ? "btn-primary" : "btn-outline-primary"
            }`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        <button
          className="btn btn-outline-primary mx-1"
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllChallenges;
