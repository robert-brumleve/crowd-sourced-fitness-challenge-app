import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import difficulty_options from "../data/difficulty";
import types from "../data/types";
import Select from "react-dropdown-select";
import challengeURL from "../data/challengeURL";

const UpdateChallenge = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [challenge, setChallenge] = useState({
    name: "",
    type: "",
    description: "",
    difficulty: "",
    creatorID: "",
    duration: "",
    imageURL: "",
  });

  const handleSelectedType = (selected) => {
    const selectedType = selected[0]?.label || "";
    setChallenge((prevChallenge) => ({
      ...prevChallenge,
      type: selectedType,
    }));
  };

  const getSelectedTypeLabel = () => {
    return types.filter((option) => option.label === challenge.type);
  };

  const handleSelectedDifficulty = (selected) => {
    const selectedDifficulty = selected[0].label || "";
    setChallenge((prevChallenge) => ({
      ...prevChallenge,
      difficulty: selectedDifficulty,
    }));
  };

  // Get the value of selected difficulty
  const getSelectedDifficultyLabel = () => {
    return difficulty_options.filter(
      (option) => option.label === challenge.difficulty
    );
  };

  useEffect(() => {
    axios
      .get(`${challengeURL}/view/${id}`)
      .then((res) => {
        console.log(res);
        setChallenge(res.data[0]);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setChallenge((prevChallenge) => ({
      ...prevChallenge,
      [name]: value,
    }));
  };

  function submitUpdate(event) {
    event.preventDefault();
    console.log("Updating challenge with data:", challenge);
    axios
      .patch(`${challengeURL}/update/${id}`, challenge, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log("Challenge updated:", res);
        navigate("/challenges");
      })
      .catch((err) => {
        console.log(err);
        navigate("/challenges");
      });
  }
  return (
    <div className="row justify-content-center">
      <Header header="UPDATE CHALLENGE" />
      <div className="w-50 bg-white rounded p-3">
        <form onSubmit={submitUpdate}>
          <div className="mb-2">
            <label htmlFor="">Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={challenge.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Type</label>
            <Select
              className="form-control"
              options={types}
              onChange={handleSelectedType}
              values={getSelectedTypeLabel()}
              name="type"
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Description</label>
            <input
              type="text"
              placeholder="Enter description"
              className="form-control"
              name="description"
              value={challenge.description}
              onChange={handleChange}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Difficulty</label>
            <Select
              className="form-control"
              options={difficulty_options}
              onChange={handleSelectedDifficulty}
              values={getSelectedDifficultyLabel()}
              name="difficulty"
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Creator</label>
            <input
              type="text"
              placeholder="Enter creator"
              className="form-control"
              name="creatorID"
              value={challenge.creatorID}
              onChange={handleChange}
            />
          </div>          
          <div className="mb-2">
            <label htmlFor="">Image URL</label>
            <input
              type="text"
              placeholder="Enter image URL"
              className="form-control"
              name="imageURL"
              value={challenge.imageURL}
              onChange={handleChange}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Tags</label>
            <input
              type="text"
              placeholder="Enter tags"
              className="form-control"
              name="tags"
              value={challenge.tags}
              onChange={handleChange}
            />
          </div>
          <button className="btn btn-info mx-2">Submit</button>
          <Link to="/challenges" className="btn btn-primary">
            Back
          </Link>
        </form>
      </div>
    </div>
  );
};

export default UpdateChallenge;
