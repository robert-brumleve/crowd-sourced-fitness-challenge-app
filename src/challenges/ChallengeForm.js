import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";

const ChallengeForm = () => {
  return (
    <Form className="page-section " id="contact">
      <h2 class="page-section-heading text-center text-uppercase text-secondary mb-0">
        ADD A NEW CHALLENGE
      </h2>
      <div class="row justify-content-center">
        <div className="form-group row">
          <label htmlFor="name" className="col-sm-2 col-form-label">
            Name
          </label>
          <Field
            className="form-control col-sm-10 "
            name="name"
            placeholder="add a challenge name"
          />
          <div className="error">
            <ErrorMessage
              className="validation-error-message"
              name="name"
              component="span"
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="description" className="col-sm-2 col-form-label">
            Description
          </label>
          <Field
            className="form-control col-sm-10"
            name="description"
            as="textarea"
            rows="3"
            placeholder="add a challenge description"
          />
          <div className="error">
            <ErrorMessage
              className="validation-error-message"
              name="description"
              component="span"
            />
          </div>
        </div>
        <fieldset className="form-group">
          <div className="row">
            <legend className="col-form-label col-sm-2 pt-0">Level</legend>
            <div className="col-sm-10">
              <div className="form-check">
                <Field
                  className="form-check-input"
                  type="radio"
                  name="level"
                  id="gridRadios1"
                  value="easy"
                />
                <label className="form-check-label" for="gridRadios1">
                  Easy
                </label>
              </div>
              <div className="form-check">
                <Field
                  className="form-check-input"
                  type="radio"
                  name="level"
                  id="gridRadios2"
                  value="medium"
                />
                <label className="form-check-label" for="gridRadios2">
                  Medium
                </label>
              </div>
              <div className="form-check">
                <Field
                  className="form-check-input"
                  type="radio"
                  name="level"
                  id="gridRadios3"
                  value="hard"
                />
                <label className="form-check-label" for="gridRadios3">
                  Hard
                </label>
              </div>
            </div>
          </div>
        </fieldset>
        <div class="form-group row">
          <div class="col-sm-10">
            <button
              type="submit"
              class="btn btn-primary btn-xl"
              id="submitButton"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </Form>
  );
};

export default ChallengeForm;
