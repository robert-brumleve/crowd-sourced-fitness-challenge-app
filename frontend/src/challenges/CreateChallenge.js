import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import ChallengeForm from "../components/ChallengeForm";
import * as Yup from "yup";
import challengeURL from "../data/challengeURL";
import axios from "axios";
import Header from "../components/Header";

const CreateChallenge = () => {
  const navigate = useNavigate();
  const [redirectMessage, setRedirectMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const userInfo = {
    username: localStorage.getItem("username"),
    userID: localStorage.getItem("userID"),
  };

  useEffect(() => {
    if (!userInfo.username || !userInfo.userID) {
      setRedirectMessage("You must log in to create a challenge.");
      setTimeout(() => navigate("/login"), 5000);
    }
<<<<<<< HEAD
  }, [navigate, userInfo]);
=======
  }, [navigate]);
>>>>>>> 24766da (fix eslint)

  const challengeFormValidation = Yup.object({
    name: Yup.string().required("Challenge name is required"),
    type: Yup.string().required("Type is required"),
    difficulty: Yup.string().required("Difficulty is required"),
  });

  const formikSubmit = async (values) => {
    try {
      const challengeData = {
        ...values,
        creatorID: userInfo.userID,
      };
      await axios.post(challengeURL, challengeData);
      navigate("/challenges");
    } catch (error) {
      console.log("print error", error.response.data.message);
      if (error.response?.data?.message === "Challenge name already exists") {
        setErrorMessage(
          "Challenge name already exists. Please choose a different name."
        );
      } else {
        setErrorMessage("An error occurred. Please try again.");
      }
    }
<<<<<<< HEAD
  };

  if (redirectMessage) {
    return (
      <div className="text-center">
        <h3>{redirectMessage}</h3>
        <p>
          Click <Link to="/challenges">here</Link> to view all community
          challenges, or you will be redirected to login in 5 seconds.
        </p>
      </div>
    );
  }
=======
  }, [formik, userInfo.username, userInfo.userID]);
>>>>>>> 24766da (fix eslint)

  return (
    <div>
      <div className="row justify-content-center">
      <Header header="ADD CHALLENGE" />
        <div className="card" style={{ width: "50rem" }}>
          <Link
            type="button"
            className="btn-close"
            aria-label="Close"
            style={{ position: "absolute", top: "10px", right: "10px" }}
            to="/challenges"
          ></Link>
          <ChallengeForm
            initialValues={{
              name: "Sample Challenge",
              type: "Yoga",
              description: "A sample description",
              difficulty: "Easy",
              username: "",
              userID: "",
              imageURL: "http://example.com/image.png",
              tags: "yoga, wellness",
            }}
            validationSchema={challengeFormValidation}
            onSubmit={formikSubmit}
            userInfo={userInfo}
            errorMessage={errorMessage}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateChallenge;
