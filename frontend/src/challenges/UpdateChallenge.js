import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import ChallengeForm from "../components/ChallengeForm";
import Header from "../components/Header";
import * as Yup from "yup";
import updateChat from "../chat/components/UpdateChat";
import url from "../components/Backend_URL";

const UpdateChallenge = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [challenge, setChallenge] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const userInfo = {
    username: localStorage.getItem("username"),
    userID: localStorage.getItem("userID"),
  };

  const challengeFormValidation = Yup.object({
    name: Yup.string().required("Challenge name is required"),
    type: Yup.string().required("Type is required"),
    difficulty: Yup.string().required("Difficulty is required"),
  });

  useEffect(() => {
    axios
      .get(`${url}/challenges/view/${id}`)
      .then((res) => {
        setChallenge(res.data[0]);
      })
      .catch((err) => console.log(err));
  }, [id]);

  if (!challenge) {
    return <div>Loading...</div>; // Show loading state until the data is fetched
  }

  const updateChallenge = async (values) => {
    console.log("values", values);
    const formData = new FormData();
    for (const key in values) {
      if (values[key] !== null && values[key] !== "") {
        formData.append(key, values[key]);
      }
    }
    
    try {
      await axios
        .patch(`${url}/challenges/update/${id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(updateChat(id, values.name))
        .then(navigate("/challenges"));
    } catch (error) {
      console.log(error);
      if (error.response?.data?.message === "Challenge name already exists") {
        setErrorMessage(
          "Challenge name already exists. Please choose a different name."
        );
      } else {
        setErrorMessage("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div>
      <div className="row justify-content-center">
        <Header header="UPDATE CHALLENGE" />
        <div className="card" style={{ width: "50rem" }}>
          <Link
            type="button"
            className="btn-close"
            aria-label="Close"
            style={{ position: "absolute", top: "10px", right: "10px" }}
            to="/challenges"
          ></Link>
          <div className="w-50 bg-white rounded p-3"></div>
          <ChallengeForm
            initialValues={
              challenge || {
                name: "",
                type: "",
                difficulty: "",
                description: "",
                tags: "",
                imageURL: "",
              }
            }
            validationSchema={challengeFormValidation}
            onSubmit={updateChallenge}
            userInfo={userInfo}
            errorMessage={errorMessage}
          />
        </div>
      </div>
    </div>
  );
};

export default UpdateChallenge;
