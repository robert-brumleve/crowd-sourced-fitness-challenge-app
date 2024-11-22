import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
// import UserChallengeList from "../components/UserChallengeList";
import Header from "../components/Header";
// import Greeting from "../components/Greeting";
import { Link } from "react-router-dom";


const DashBoard = () => {
  // const { id } = useParams();
  const [challenges, setChallenges] = useState([]);

  const userInfo = useMemo(
    () => ({
      username: localStorage.getItem("username"),
      userID: localStorage.getItem("userID"),
    }),
    []
  );

  const id = userInfo.userID;

  useEffect(() => {
    // console.log("userID from localStorage:", userInfo.userID);

    // Get challenge data based on the userID
    axios
      .get(`http://localhost:5000/dashboard/userchallenges/${id}`)
      .then((res) => {
        console.log(res);
        setChallenges(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <div>
      <section class="py-5 text-center container">
        <div class="row py-lg-5">
          <div class="col-lg-6 col-md-8 mx-auto">
            <h1 class="fw-light">Challenge Dashboard</h1>
            <p class="lead text-muted">
              This dashboard displays the most recent challenges you have
              participated in. Keep moving!
            </p>
            <p>
              {/* <a href="/placeholder" class="btn btn-primary my-2">My Challenges</a> */}
              <a href="/challenges" class="btn btn-secondary my-2">
                Find Community Challenges
              </a>
            </p>
          </div>
        </div>
      </section>
      <Header header="MY CHALLENGES"/>
      {/* <div className="table-responsive">
        <table className="table table-sm table-bordered table-hover">
          <thead>
            <th>User ID</th>
            <th>Challenge ID</th>
            <th>Name</th>
        </thead>
        <tbody>
            {challenges.map((item, i) => {
              return (
                <UserChallengeList
                  // key={item.userID}
                  userID={item.userID}
                  challengeID={item.challengeID}
                  name={item.name}
                />
              );
            })}
          </tbody>
        </table>
      </div> */}


    <div>
      {challenges.map((item, index) => {
      return (
      <div class="album py-5 bg-light">
                <div class="container">
                  <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                    <div class="col">
                      <div class="card shadow-sm">
                        <svg
                          class="bd-placeholder-img card-img-top"
                          width="100%"
                          height="225"
                          xmlns="http://www.w3.org/2000/svg"
                          role="img"
                          aria-label="Placeholder: Thumbnail"
                          preserveAspectRatio="xMidYMid slice"
                          focusable="false"
                        >
                          <title>Placeholder</title>
                          <rect width="100%" height="100%" fill="#55595c" />
                          <text x="50%" y="50%" fill="#eceeef" dy=".3em">
                            Thumbnail
                          </text>
                        </svg>

                        <div class="card-body" key={ index }>
                          <p class="card-text">{item.name}</p>
                          <div class="d-flex justify-content-between align-items-center">
                            <div class="btn-group">
                              {/* Button to view challenge */}
                              <button
                                type="button"
                                class="btn btn-sm btn-outline-secondary"
                              >
                                <Link
                                  to={`/challenges/view/${item.challengeID}`}
                                  className="btn btn-info btn-sm"
                                >
                                  View{" "}
                                </Link>
                              </button>

                              {/* Button to complete challenge */}
                              <button
                                type="button"
                                class="btn btn-sm btn-outline-secondary"
                              >
                                <Link
                                  to={`/challenges/update/${item.challengeID}`}
                                  className="btn btn-sm btn-primary mx-2"
                                >
                                  {" "}
                                  Complete Challenge{" "}
                                </Link>
                              </button>
                            </div>
                            {/* List the challenge's difficulty level*/}
                            <small class="text-muted">{item.difficulty}</small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              );
            })}
          </div>


    </div>
  );
};

export default DashBoard;
