import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";

const UpdateChallenge = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [challenge, setChallenge] = useState({
    name: "",
    description: "",
    difficulty: "",
    creatorID: "",
    imageURL: "",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/challenges/view/${id}`)
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
      .patch(`http://localhost:5000/api/challenges/update/${id}`, challenge, {
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
        <Header header="UPDATE CHALLENGE"/>
      <div className="w-50 bg-white rounded p-3">
        <form onSubmit={submitUpdate}>
          <div className="mb-2">
            <label htmlFor="">Name</label>
            <input
              type="text"
              //   readonly
              className="form-control"
              name="name"
              value={challenge.name}
              onChange={handleChange}
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
            <input
              type="text"
              // placeholder="difficulty"
              className="form-control"
              name="difficulty"
              value={challenge.difficulty}
              onChange={handleChange}
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
