import React, { useState } from "react";
import { useFormik } from "formik";
import Select from "react-dropdown-select";
import difficulty_options from "../data/difficulty";
import types from "../data/types";

const ChallengeForm = ({
  initialValues,
  validationSchema,
  onSubmit,
  userInfo,
  errorMessage,
}) => {
  const [previewImg, setPreviewImg] = useState(null);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  // Handle the Select change dynamically
  const handleSelectChange = (name) => (selected) => {
    const selectedType = selected[0]?.label || "";
    formik.setFieldValue(name, selectedType);
    formik.setFieldValue(
      "badgeName",
      `${process.env.PUBLIC_URL}/img/badges/${selectedType}.jpg`
    );
  };

  const getSelectedValue = (property, options) => {
    return options.filter((option) => option.label === formik.values[property]);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Get the selected file
    if (file) {
      formik.setFieldValue("imageURL", file);
      const imgUrl = URL.createObjectURL(file);
      setPreviewImg(imgUrl); // Set the preview image
    }
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      {/* Name Field */}
      <div className="mb-2">
        <label htmlFor="name">Name</label>
        <input
          type="text"
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
          onChange={handleSelectChange("type")}
          values={getSelectedValue("type", types)}
          name="type"
        />
        {formik.touched.type && formik.errors.type && (
          <div className="text-danger">{formik.errors.type}</div>
        )}
      </div>

      {/* Description Field */}
      <div className="mb-2">
        <label htmlFor="description">Description</label>
        <input
          type="text"
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
          onChange={handleSelectChange("difficulty")}
          values={getSelectedValue("difficulty", difficulty_options)}
          name="difficulty"
        />
        {formik.touched.difficulty && formik.errors.difficulty && (
          <div className="text-danger">{formik.errors.difficulty}</div>
        )}
      </div>

      {/* Creator Name Field */}
      <div className="mb-2">
        <label>Creator</label>
        <input
          type="text"
          className="form-control"
          name="username"
          value={userInfo.username}
          disabled
        />
      </div>

      {/* Image URL Field */}
      <div className="mb-2">
        <label htmlFor="imageURL">Image</label>
        <input
          type="file"
          className="form-control"
          name="imageURL"
          onChange={handleFileChange}
          onBlur={formik.handleBlur}
        />
        {previewImg && (
          <div>
            <p>Selected Image:</p>
            <img src={previewImg} alt="Profile" width="50" height="50" />
          </div>
        )}
        {formik.touched.imageURL && formik.errors.imageURL && (
          <div className="text-danger">{formik.errors.imageURL}</div>
        )}
      </div>

      {/* Tags Field */}
      <div className="mb-2">
        <label htmlFor="tags">Tags</label>
        <input
          type="text"
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

      {/* BadgeName Field */}
      <div className="mb-2">
        <label htmlFor="badgeImage">Badge</label>
        {formik.values.type ? (
          <img
            src={formik.values.badgeName}
            alt={formik.values.type}
            style={{ width: "100px", height: "100px", objectFit: "cover" }}
          />
        ) : (
          <p>No badge selected</p>
        )}
      </div>

      {errorMessage && <div className="text-danger">{errorMessage}</div>}
      <button type="submit" className="form-control">
        Submit
      </button>
    </form>
  );
};

export default ChallengeForm;
