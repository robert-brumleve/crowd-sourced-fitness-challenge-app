import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateChallenge = (props) => {
  const [challenge, setChallenge] = useState({
    name: "",
    description: "",
    difficulty: "",
    creatorID: "",
    imageURL: "",
  });

  const navigate = useNavigate();

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
      .post("http://localhost:5000/api/challenges", challenge)
      .then((response) => {
        console.log("Challenge added:", response.data);

        // props.onAdd(challenge);
        navigate("/challenges");
      })
      .catch((error) => {
        console.error("There was an error adding new challenge!", error);
      });
  }
  return (
    <div className="row justify-content-center">
      <div className="w-50 bg-white rounded p-3">
        <form onSubmit={submitChallenge}>
          <h2>ADD CHALLENGE</h2>
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
          <div className="='mb-2">
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
          <div className="='mb-2">
            <label htmlFor="">Difficulty</label>
            <input
              type="text"
              // placeholder="Add a new challenge name"
              className="form-control"
              name="difficulty"
              value={challenge.difficulty}
              onChange={handleChange}
            />
          </div>
          <div className="='mb-2">
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
          <div className="='mb-2">
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
          <button className="btn btn-success ">Add</button>
        </form>
      </div>
    </div>
  );
};

export default CreateChallenge;
