import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";

import ChallengeForm from "./ChallengeForm";

const NewChallenge = ({ onAdd }) => {
  const initialValues = {
    name: "",
    description: "",
    level: "easy",
  };
  const onSubmit = (values, { resetForm }) => {
    onAdd({ id: Math.random(), ...values });
    resetForm();
  };
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    description: Yup.string().required("Description is required"),
  });

  return (
    <div className="form-group challenge-form">
      <h1>Create New Challenge</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {() => <ChallengeForm />}
      </Formik>
    </div>
  );
};

export default NewChallenge;
