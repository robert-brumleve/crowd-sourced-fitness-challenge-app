import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Select from "react-dropdown-select";
import difficulty_options from "../data/difficulty";
import types from "../data/types";
import challengeURL from "../data/challengeURL";
import { useFormik } from "formik";
import FormValidation from "../components/FormValidation";

const CreateChallenge = (props) => {
  const initialValues = {
    name: "Sample Challenge",
    type: "Yoga",
    description: "A sample description",
    difficulty: "Easy",
    creatorID: 1,
    imageURL: "image.com",
    tags: "yoga, wellness",
  };
  const [challenge, setChallenge] = useState(initialValues);

  const navigate = useNavigate();

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

  function handleChange(event) {
    const { name, value } = event.target;

    setChallenge((prevChallenges) => {
      return {
        ...prevChallenges,
        [name]: value,
      };
    });
  }

  function submitChallenge(event) {
    event.preventDefault();
    console.log("Submitting challenge:", challenge);

    axios
      .post(`${challengeURL}`, challenge)
      .then((response) => {
        console.log("Challenge added:", response.data);
        navigate("/challenges");
      })
      .catch((error) => {
        console.error("There was an error adding new challenge!", error);
      });
  }
  return (
    <div className="row justify-content-center">
      <div class="card" style={{ width: "30rem" }}>
        <form onSubmit={submitChallenge}>
          <h2>ADD CHALLENGE</h2>
          <Link
            type="button"
            class="btn-close"
            aria-label="Close"
            style={{ position: "absolute", top: "10px", right: "10px" }}
            to="/challenges"
          ></Link>
          <div className="mb-2">
            <label htmlFor="">Name</label>
            <input
              type="text"
              placeholder="Add a new challenge name"
              className="form-control"
              name="name"
              value={challenge.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-2">
            <label>Type</label>
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
            <textarea
              rows="3"
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
              type="number"
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
          <button className="btn btn-success ">Add</button>
        </form>
      </div>
    </div>
  );
};

export default CreateChallenge;
