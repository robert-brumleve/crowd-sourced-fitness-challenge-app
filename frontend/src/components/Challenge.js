import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";

const Challenge = (props) => {
  return (
    <div className="mx-auto" >
      <Header header="CHALLENGE DETAIL" />
      <div className="card mx-auto" style={{ maxWidth: "45rem" }}>
        <Link
          to="/challenges"
          className="btn-close btn-close-dark position-absolute"
          style={{ top: "10px", right: "10px" }}
          aria-label="Close"
        ></Link>
        <img
          class="card-img-top"
          src={
            props.imageURL ||
            `${process.env.PUBLIC_URL}/img/defaultChallengeImg.png`
          }
          alt="Challenge Detail"
          style={{
            height: "10rem",
            width: "100%",
            objectFit: "contain",
            alignSelf: "left",
          }}
        ></img>
        <div className="card-body">
          <h5 class="card-title">{props.name}</h5>
          <p className="card-text">{props.description}</p>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">Type: {props.type}</li>
          <li class="list-group-item">Level: {props.difficulty}</li>
          <li class="list-group-item">Creator: {props.username}</li>
          <li class="list-group-item">Created at: {props.created_at}</li>
          <li class="list-group-item">Tags: {props.tags}</li>
          <li
            className="list-group-item"
            style={{ display: "flex", alignItems: "center" }}
          >
            <span style={{ marginRight: "1rem" }}>Badge:</span>
            <img
              src={`${process.env.PUBLIC_URL}/img/badges/${props.type}.jpg`}
              alt={props.type}
              style={{
                height: "5rem",
                width: "5rem", // Ensures square shape
                objectFit: "contain",
              }}
            />
          </li>
        </ul>
        <div class="card-body">
          {props.errorUpdateMessage && (
            <div className="alert alert-danger">{props.errorUpdateMessage}</div>
          )}
          {props.errorDeleteMessage && (
            <div className="alert alert-danger">{props.errorDeleteMessage}</div>
          )}
          {props.errorJoinMessage && (
            <div className="alert alert-danger">{props.errorJoinMessage}</div>
          )}

          {!props.hasJoined ? (
            <button
              onClick={props.handleJoinClick}
              className="btn btn-outline-success me-2"
            >
              Join
            </button>
          ) : (
            <button
              onClick={props.handleChatClick} // Navigate to chatroom when clicked
              className="btn btn-outline-success me-2"
            >
              Chat
            </button>
          )}

          <button
            onClick={props.handleUpdateClick}
            className="btn btn-outline-info me-2"
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
