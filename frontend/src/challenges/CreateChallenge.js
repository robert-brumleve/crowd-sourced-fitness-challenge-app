import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Select from "react-dropdown-select";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import difficulty_options from "../data/difficulty";
import types from "../data/types";
import challengeURL from "../data/challengeURL";

const CreateChallenge = () => {
  const navigate = useNavigate();

  // Validation Schema
  const challengeFormValidation = Yup.object({
    name: Yup.string().required("Challenge name is required"),
    type: Yup.string().required("Type is required"),
    // description: Yup.string().required("Description is required"),
    difficulty: Yup.string().required("Difficulty is required"),
    creatorID: Yup.number()
      .required("Creator ID is required")
      .positive("Creator ID must be a positive number"),
  });

  // Formik Hook
  const formik = useFormik({
    // initialValues: {
    //   name: "Sample Challenge",
    //   type: "Yoga",
    //   description: "A sample description",
    //   difficulty: "Easy",
    //   creatorID: "1",
    //   imageURL: "http://example.com/image.png",
    //   tags: "yoga, wellness",
    // },

    initialValues: {
      name: "",
      type: "",
      description: "",
      difficulty: "",
      creatorID: "",
      imageURL: "",
      tags: "",
    },
    validationSchema: challengeFormValidation,
    onSubmit: (values) => {
      // Make POST request
      axios
        .post(challengeURL, values)
        .then((response) => {
          console.log("Challenge added:", response.data);
          navigate("/challenges");
        })
        .catch((error) => {
          console.error("Error adding challenge:", error);
          console.error("Error response adding challenge:", error.response);
          console.error(
            "Error response.data adding challenge:",
            error.response.data
          );
          console.error(
            "Error response.data.message adding challenge:",
            error.response.data.message
          );
          if (
            error.response &&
            error.response.data &&
            error.response.data.message === "Challenge name already exists"
          ) {
            alert(
              "Challenge name already exists. Please choose a different name."
            );
          } else {
            alert("An error occurred. Please try again.");
          }
        });
    },
  });

  return (
    <div className="row justify-content-center">
      <div className="card" style={{ width: "40rem" }}>
        <form onSubmit={formik.handleSubmit}>
          <h2>ADD CHALLENGE</h2>
          <Link
            type="button"
            className="btn-close"
            aria-label="Close"
            style={{ position: "absolute", top: "10px", right: "10px" }}
            to="/challenges"
          ></Link>

          {/* Name Field */}
          <div className="mb-2">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              placeholder="Add a new challenge name"
              className="form-control"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.name && formik.errors.name && (
              <div className="text-danger">{formik.errors.name}</div>
            )}
          </div>

          {/* Type Field */}
          <div className="mb-2">
            <label>Type</label>
            <Select
              className="form-control"
              options={types}
              onChange={(selected) =>
                formik.setFieldValue("type", selected[0]?.label || "")
              }
              values={types.filter(
                (option) => option.label === formik.values.type
              )}
              name="type"
            />
            {formik.touched.type && formik.errors.type && (
              <div className="text-danger">{formik.errors.type}</div>
            )}
          </div>

          {/* Description Field */}
          <div className="mb-2">
            <label htmlFor="description">Description</label>
            <textarea
              rows="3"
              placeholder="Enter description"
              className="form-control"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.description && formik.errors.description && (
              <div className="text-danger">{formik.errors.description}</div>
            )}
          </div>

          {/* Difficulty Field */}
          <div className="mb-2">
            <label>Difficulty</label>
            <Select
              className="form-control"
              options={difficulty_options}
              onChange={(selected) =>
                formik.setFieldValue("difficulty", selected[0]?.label || "")
              }
              values={difficulty_options.filter(
                (option) => option.label === formik.values.difficulty
              )}
              name="difficulty"
            />
            {formik.touched.difficulty && formik.errors.difficulty && (
              <div className="text-danger">{formik.errors.difficulty}</div>
            )}
          </div>

          {/* Creator ID Field */}
          <div className="mb-2">
            <label htmlFor="creatorID">Creator</label>
            <input
              type="number"
              placeholder="Enter creator ID"
              className="form-control"
              name="creatorID"
              value={formik.values.creatorID}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.creatorID && formik.errors.creatorID && (
              <div className="text-danger">{formik.errors.creatorID}</div>
            )}
          </div>

          {/* Image URL Field */}
          <div className="mb-2">
            <label htmlFor="imageURL">Image URL</label>
            <input
              type="text"
              placeholder="Enter image URL"
              className="form-control"
              name="imageURL"
              value={formik.values.imageURL}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.imageURL && formik.errors.imageURL && (
              <div className="text-danger">{formik.errors.imageURL}</div>
            )}
          </div>

          {/* Tags Field */}
          <div className="mb-2">
            <label htmlFor="tags">Tags</label>
            <input
              type="text"
              placeholder="Enter tags"
              className="form-control"
              name="tags"
              value={formik.values.tags}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.tags && formik.errors.tags && (
              <div className="text-danger">{formik.errors.tags}</div>
            )}
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-success">
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateChallenge;
