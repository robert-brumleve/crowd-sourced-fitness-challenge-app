import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";

const Challenge = (props) => {
  return (
    <div>
      <Header header="CHALLENGE DETAIL" />
      <div className="card mx-auto" style={{ width: "45rem" }}>
        <Link
          to="/challenges"
          className="btn-close btn-close-dark position-absolute"
          style={{ top: "10px", right: "10px" }}
          aria-label="Close"
        ></Link>
        <div className="card-body">
          <h5 class="card-title">{props.name}</h5>
          <p className="card-text">{props.description}</p>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">Type: {props.type}</li>
          <li class="list-group-item">Level: {props.difficulty}</li>
          <li class="list-group-item">Creator: {props.username}</li>
          <li class="list-group-item">Image URL: {props.imageURL}</li>
          <li class="list-group-item">Created at: {props.created_at}</li>
          <li class="list-group-item">Tags: {props.tags}</li>
        </ul>
        <div class="card-body">
          {props.errorUpdateMessage && (
            <div className="alert alert-danger">
              {props.errorUpdateMessage}
            </div>
          )}
          {props.errorDeleteMessage && (
            <div className="alert alert-danger">
              {props.errorDeleteMessage}
            </div>
          )}
          <button
            onClick={props.handleUpdateClick}
            className="btn btn-outline-info"
          >
            Update
          </button>          
          <button
            onClick={props.handleDeleteClick}
            className="btn btn-outline-danger"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Challenge;
