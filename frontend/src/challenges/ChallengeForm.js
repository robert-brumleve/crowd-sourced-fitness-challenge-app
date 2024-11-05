import React from "react";
import { Field, Form, ErrorMessage } from "formik";

const ChallengeForm = () => {
  return (
    <Form>
      
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title fw-bold fs-4" id="exampleModalLabel">
                Add A New Challenge
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="form-group row">
                <label htmlFor="name" className="col-sm-2 col-form-label fw-bold">
                  Name
                </label>
                <Field
                  className="form-control col-sm-10 "
                  name="name"
                  placeholder="add a challenge name"
                />
                <div className="error">
                  <ErrorMessage
                    className="validation-error-message text-danger"
                    name="name"
                    component="span"
                  />
                </div>
              </div>
              <div className="form-group row">
                <label
                  htmlFor="description"
                  className="col-sm-2 col-form-label fw-bold"
                >
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
                    className="validation-error-message text-danger"
                    name="description"
                    component="span"
                  />
                </div>
              </div>
              <fieldset className="form-group">
                <div className="row">
                  <legend className="col-form-label col-sm-2 pt-0 fw-bold">
                    Level
                  </legend>
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
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="submit" class="btn btn-primary" id="submitButton">
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </Form>
  );
};

export default ChallengeForm;
