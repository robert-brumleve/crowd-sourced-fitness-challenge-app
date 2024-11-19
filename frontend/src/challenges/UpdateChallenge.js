// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import Header from "../components/Header";
// import difficulty_options from "../data/difficulty";
// import types from "../data/types";
// import Select from "react-dropdown-select";
// import challengeURL from "../data/challengeURL";

// const UpdateChallenge = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const userInfo = {
//     username: localStorage.getItem("username"),
//     userID: localStorage.getItem("userID"),
//   };

//   const challengeFormValidation = Yup.object({
//     name: Yup.string().required("Challenge name is required"),
//     type: Yup.string().required("Type is required"),
//     difficulty: Yup.string().required("Difficulty is required"),
//   });

//   const [challenge, setChallenge] = useState({
//     name: "",
//     type: "",
//     description: "",
//     difficulty: "",
//     creatorID: "",
//     duration: "",
//     imageURL: "",
//   });

//   const handleSelectChange = (name) => (selected) => {
//     setChallenge((prevChallenge) => ({
//       ...prevChallenge,
//       [name]: selected[0]?.label || "",
//     }));
//   };

//   const getSelectedValue = (property, options) => {
//     return options.filter((option) => option.label === challenge.property)
//   }

//   // const handleSelectedType = (selected) => {
//   //   const selectedType = selected[0]?.label || "";
//   //   setChallenge((prevChallenge) => ({
//   //     ...prevChallenge,
//   //     type: selectedType,
//   //   }));
//   // };

//   // const getSelectedTypeLabel = () => {
//   //   return types.filter((option) => option.label === challenge.type);
//   // };

//   // const handleSelectedDifficulty = (selected) => {
//   //   const selectedDifficulty = selected[0].label || "";
//   //   setChallenge((prevChallenge) => ({
//   //     ...prevChallenge,
//   //     difficulty: selectedDifficulty,
//   //   }));
//   // };

//   // // Get the value of selected difficulty
//   // const getSelectedDifficultyLabel = () => {
//   //   return difficulty_options.filter(
//   //     (option) => option.label === challenge.difficulty
//   //   );
//   // };

//   useEffect(() => {
//     axios
//       .get(`${challengeURL}/view/${id}`)
//       .then((res) => {
//         console.log(res);
//         setChallenge(res.data[0]);
//       })
//       .catch((err) => console.log(err));
//   }, [id]);

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setChallenge((prevChallenge) => ({
//       ...prevChallenge,
//       [name]: value,
//     }));
//   };

//   function submitUpdate(event) {
//     event.preventDefault();
//     console.log("Updating challenge with data:", challenge);
//     axios
//       .patch(`${challengeURL}/update/${id}`, challenge, {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       })
//       .then((res) => {
//         console.log("Challenge updated:", res);
//         navigate("/challenges");
//       })
//       .catch((err) => {
//         console.log(err);
//         navigate("/challenges");
//       });
//   }
//   return (
//     <div className="row justify-content-center">
//       <Header header="UPDATE CHALLENGE" />
//       <div className="w-50 bg-white rounded p-3">
//         <form onSubmit={submitUpdate}>
//           <div className="mb-2">
//             <label htmlFor="">Name</label>
//             <input
//               type="text"
//               className="form-control"
//               name="name"
//               value={challenge.name}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="mb-2">
//             <label htmlFor="">Type</label>
//             <Select
//               className="form-control"
//               options={types}
//               onChange={handleSelectChange("type")}
//               values={getSelectedValue("type", types)}
//               name="type"
//             />
//           </div>
//           <div className="mb-2">
//             <label htmlFor="">Description</label>
//             <input
//               type="text"
//               placeholder="Enter description"
//               className="form-control"
//               name="description"
//               value={challenge.description}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="mb-2">
//             <label htmlFor="">Difficulty</label>
//             <Select
//               className="form-control"
//               options={difficulty_options}
//               onChange={handleSelectChange("difficulty")}
//               values={getSelectedValue("difficulty", difficulty_options)}
//               name="difficulty"
//             />
//           </div>
//           <div className="mb-2">
//             <label htmlFor="">Creator</label>
//             <input
//               type="text"
//               placeholder="Enter creator"
//               className="form-control"
//               name="creatorID"
//               value={userInfo.username}
//               onChange={handleChange}
//               disable
//               style={{ backgroundColor: "#e9ecef", color: "#6c757d" }}
//             />
//           </div>
//           <div className="mb-2">
//             <label htmlFor="">Image URL</label>
//             <input
//               type="text"
//               placeholder="Enter image URL"
//               className="form-control"
//               name="imageURL"
//               value={challenge.imageURL}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="mb-2">
//             <label htmlFor="">Tags</label>
//             <input
//               type="text"
//               placeholder="Enter tags"
//               className="form-control"
//               name="tags"
//               value={challenge.tags}
//               onChange={handleChange}
//             />
//           </div>
//           <button className="btn btn-info mx-2">Submit</button>
//           <Link to="/challenges" className="btn btn-primary">
//             Back
//           </Link>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default UpdateChallenge;

import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import ChallengeForm from "../components/ChallengeForm";
import challengeURL from "../data/challengeURL";
import Header from "../components/Header";
import * as Yup from "yup";

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
      .get(`${challengeURL}/view/${id}`)
      .then((res) => {
        setChallenge(res.data[0]);
      })
      .catch((err) => console.log(err));
  }, [id]);

  if (!challenge) {
    return <div>Loading...</div>; // Show loading state until the data is fetched
  }

  const updateChallenge = async (values) => {
    try {
      await axios.patch(`${challengeURL}/update/${id}`, values);
      navigate("/challenges");
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
            initialValues={challenge}
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
