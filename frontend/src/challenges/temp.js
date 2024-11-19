import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import ChallengeForm from "../components/ChallengeForm";
import challengeURL from "../data/challengeURL";

const UpdateChallenge = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [challenge, setChallenge] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null); // Initialize state for error message

  const userInfo = {
    username: localStorage.getItem("username"),
    userID: localStorage.getItem("userID"),
  };

  useEffect(() => {
    axios
      .get(`${challengeURL}/view/${id}`)
      .then((res) => setChallenge(res.data[0]))
      .catch((err) => console.log(err));
  }, [id]);

  const updateChallenge = async (values) => {
    try {
      await axios.patch(`${challengeURL}/update/${id}`, values);
      navigate("/challenges");
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 409) {
        // Assuming status 409 for conflict (like name already exists)
        setErrorMessage(
          "Challenge name already exists. Please choose a different name."
        );
      } else {
        setErrorMessage("An error occurred. Please try again.");
      }
    }
  };

  if (!challenge) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="row justify-content-center">
        <Header header="UPDATE CHALLENGE" />
        <div className="w-50 bg-white rounded p-3"></div>
        <ChallengeForm
          initialValues={challenge}
          validationSchema={challengeFormValidation}
          onSubmit={updateChallenge}
          userInfo={userInfo}
          errorMessage={errorMessage}
        />
      </div>
    </div>
  );
};

export default UpdateChallenge;
