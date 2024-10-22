import React from "react";

function Card(props) {
  function handleClick() {
    props.onDelete(props.id);
  }

  return (
    <div className="card w-50">
      <div class="card-body">
        <h5 class="card-title fw-bolder">{props.name}</h5>
        {/* <img className="circle-img" src={props.img} alt="avatar_img" /> */}
        <p class="card-text">{props.description}</p>
        <p class="card-text">Level: {props.level}</p>
        <button class="btn btn-primary" type="submit">
          View
        </button>
        <button class="btn btn-primary" type="submit">
          Join
        </button>
        <button class="btn btn-danger" type="submit" onClick={handleClick}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default Card;
