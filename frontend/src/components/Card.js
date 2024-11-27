import React from "react";

function Card(props) {
  function onDeleteClick() {
    props.onDelete(props.challengeID);
  }

  return (
    <div className="card w-50">
      <div className="card-body">
        <h5 className="card-title fw-bolder">{props.name}</h5>
        <p className="card-text">Description: {props.description}</p>
        <p className="card-text">Level: {props.difficulty}</p>
        <p className="card-text">Created by: {props.creatorID}</p>
        <p className="card-text">Image: {props.imageURL}</p>
        <button className="btn btn-primary" type="submit">
          Join
        </button>
        <button
          className="btn btn-danger"
          type="submit"
          onClick={onDeleteClick}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default Card;
