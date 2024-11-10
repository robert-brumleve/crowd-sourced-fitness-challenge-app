import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const DashBoard = () => {
  const [data, setData] = useState([])
  useEffect (() =>{
    fetch('http://localhost:5000/api/challenges')
    .then(res => res.json())
    .then(data => setData(data))
    .catch(err => console.log(err));
  }, [])

// const DashBoard = () => {
//   const [challenges, setChallenges] = useState([]);
//   const {id} = useParams();

//   useEffect (() =>{
//     // fetch(`http://localhost:5000/api/challenges/view/${id}`)
//     fetch('http://localhost:5000/api/challenges')
//     // .then((res) => {
//       // console.log(res);
//       // setChallenge(res.data[0]);
//     .then(res => res.json())
//     .then((res) => setChallenges(res.data))
//     // .then((res) => setChallenge(res.data))
//     // })
//     .catch(err => console.log(err));
//   }, [])


  return (
  <div>
  {/* Reference: https://getbootstrap.com/docs/5.1/examples/
  <link href="../assets/dist/css/bootstrap.min.css" rel="stylesheet"> */}
      <section class="py-5 text-center container">
      <div class="row py-lg-5">
        <div class="col-lg-6 col-md-8 mx-auto">
          <h1 class="fw-light">Challenge Dashboard</h1>
          <p class="lead text-muted">This dashboard displays the most recent challenges you have participated in. Keep moving!</p>
          <p>
            {/* <a href="/placeholder" class="btn btn-primary my-2">My Challenges</a> */}
            <a href="/challenges" class="btn btn-secondary my-2">Community Challenges</a>
          </p>
        </div>
      </div>
      </section>

      <div>
      {data.map((d, i) => {
          return (
      <div class="album py-5 bg-light">
      <div class="container">

        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
          <div class="col">
            <div class="card shadow-sm">
              <svg class="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"/><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg>

              <div class="card-body" key = {i}>

                <p class="card-text">{d.name}</p>
                <div class="d-flex justify-content-between align-items-center">
                  <div class="btn-group">
                    <button type="button" class="btn btn-sm btn-outline-secondary">
                      <Link to={`/challenges/view/${d.challengeID}`}
                      className="btn btn-info btn-sm">View </Link>
                      </button>

                    <button type="button" class="btn btn-sm btn-outline-secondary">
                    <Link
                      to={`/challenges/update/${d.challengeID}`}
                      className="btn btn-sm btn-primary mx-2"> Edit </Link>
                      </button>
                  </div>
                  <small class="text-muted">9 mins</small>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
      </div>
          )
          })}
      </div>
</div>
)
};

export default DashBoard;
