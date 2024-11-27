import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
// import UserChallengeList from "../components/UserChallengeList";
// import Header from "../components/Header";
// import Greeting from "../components/Greeting";
import { Link } from "react-router-dom";
import url from "../components/Backend_URL";

const DashBoard = () => {
  // const { id } = useParams();
  const [challenges, setChallenges] = useState([]);
  const [badges, setBadges] = useState([]);
  const [errorJoinMessage, setErrorJoinMessage] = useState();

  const userInfo = useMemo(
    () => ({
      username: localStorage.getItem("username"),
      userID: localStorage.getItem("userID"),
    }),
    []
  );

  const id = userInfo.userID;

  // Get challenge data based on the userID
  useEffect(() => {
    axios
      .get(`${url}/dashboard/userchallenges/${id}`)
      .then((res) => {
        console.log(res);
        setChallenges(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  // Get badges data based on the userID
  useEffect(() => {
    axios
      .get(`${url}/dashboard/userbadges/${id}`)
      .then((res) => {
        console.log(res);
        setBadges(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  // Function to handle when user click on Complete Challenge
  const handleCompleteClick = async (value) => {
    if (!userInfo.username || !userInfo.userID) {
      setErrorJoinMessage(
        <>
          You should log in to complete this challenge. Click{" "}
          <Link to="/login">here</Link> to login.
        </>
      );
    } else {
      setErrorJoinMessage(null);
      // When user click on Complete challenge, the completed column in users_has_challenges will be updated to 1 (True)
      const cid = value;
      try {
        await axios.post(`${url}/dashboard/updatecompleted/${id}/${cid}`, {
          completed: 1,
          userid: id,
          challengeid: cid,
        });
        // console.log(result.response.data);
      } catch (error) {
        console.error(error.response.data);
      }
    }
  };

  return (
    <div>
      <section className="py-5 text-center container">
        <div className="row py-lg-5">
          <div className="col-lg-6 col-md-8 mx-auto">
            <h1 className="fw-light">Challenge Dashboard</h1>
            <p className="lead text-muted">
              This dashboard displays the most recent challenges you have
              participated in. Keep moving!
            </p>
            <p>
              {/* <a href="/placeholder" className="btn btn-primary my-2">My Challenges</a> */}
              <a href="/challenges" className="btn btn-secondary my-2">
                Find Community Challenges
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* <Header header="MY CHALLENGES" /> */}
      <div className="table-responsive py-5 text-center container">
          <h3>MY BADGES</h3>
          <div>
            {badges.map((item, i) => (
                <img src={item.badgeURL} alt="" width="50" height="60"/>
            ))}
            </div>
      </div>

      <div>
        {challenges.map((item, index) => {
          return (
            <div className="album py-5 bg-light" key={index}>
              <div className="container">
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                  <div className="col">
                    <div className="card shadow-sm">
                      {item.imageURL ? (
                        <img src={item.imageURL} alt="" />
                      ) : (
                        <>
                          <svg
                            className="bd-placeholder-img card-img-top"
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
                        </>
                      )}

                      <div className="card-body">
                        <p className="card-text">{item.name}</p>
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="btn-group">
                            {/* Button to view challenge */}
                            <button
                              type="button"
                              className="btn btn-sm btn-outline-secondary"
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
                              className="btn btn-sm btn-outline-secondary"
                              onClick={() =>
                                handleCompleteClick(item.challengeID)
                              }
                              errorJoinMessage={errorJoinMessage}
                            >
                              {" "}
                              Complete Challenge{" "}
                            </button>
                          </div>
                          {/* List the challenge's difficulty level*/}
                          <small className="text-muted">
                            {item.difficulty}
                          </small>
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
