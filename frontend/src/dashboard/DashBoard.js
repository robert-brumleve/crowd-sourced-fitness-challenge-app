import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import Pagination from "../components/Pagination";
import { Link } from "react-router-dom";
import url from "../components/Backend_URL";
import ChallengesListDashboard from "../components/ChallengesListDashboard";

const DashBoard = () => {
  const [challenges, setChallenges] = useState([]);
  const [badges, setBadges] = useState([]);
  // const [errorJoinMessage, setErrorJoinMessage] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 12;
  // pagination
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = challenges.slice(firstPostIndex, lastPostIndex);
  console.log("currentPosts", currentPosts);
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
    // if (!userInfo.username || !userInfo.userID) {
    //   setErrorJoinMessage(
    //     <>
    //       You should log in to complete this challenge. Click{" "}
    //       <Link to="/login">here</Link> to login.
    //     </>
    //   );
    //   return;
    // }
    // When user click on Complete challenge, the completed column in
    // users_has_challenges will be updated to 1 (True)
    const cid = value;
    try {
      await axios.post(`${url}/dashboard/updatecompleted/${id}/${cid}`, {
        completed: 1,
        userid: id,
        challengeid: cid,
      });
      setChallenges((prevChallenges) =>
        prevChallenges.map((challenge) =>
          challenge.challengeID === cid
            ? { ...challenge, completed: 1 }
            : challenge
        )
      );

      axios
      .get(`${url}/dashboard/userbadges/${id}`)
      .then((res) => {
        console.log(res);
        setBadges(res.data);
      })
      .catch((err) => console.log(err));


      // setErrorJoinMessage(null);
      // console.log(result.response.data);
    } catch (error) {
      console.error(error.response.data);
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
              {/* <a href="/placeholder" className="btn btn-primary my-2">My Challenges</a>
               */}
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
            <img key={i} src={item.badgeURL} alt="" width="50" height="60" />
          ))}
        </div>
      </div>
      <div className="table-responsive">
        <div className="row g-3">
          {currentPosts.map((item) => (
            <div
              key={item.challengeID}
              className="col-lg-2 col-md-3 col-sm-6 col-12"
            >
              <ChallengesListDashboard
                challengeID={item.challengeID}
                imageURL={item.imageURL}
                type={item.type}
                name={item.name}
                difficulty={item.difficulty}
                completed={item.completed}
                handleCompleteClick={handleCompleteClick}
              />
            </div>
          ))}
          <Pagination
            totalPosts={challenges.length}
            postsPerPage={postsPerPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        </div>
      </div>
    </div>
  );
};
export default DashBoard;
