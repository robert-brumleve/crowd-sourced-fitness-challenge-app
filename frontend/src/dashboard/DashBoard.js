import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import UserChallengeList from "../components/UserChallengeList";
import Header from "../components/Header";
import Greeting from "../components/Greeting";


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
       <Greeting />
      <section class="py-5 text-center container">
        <div class="row py-lg-5">
          <div class="col-lg-6 col-md-8 mx-auto">
            <h1 class="fw-light">Challenge Dashboard</h1>
            <p class="lead text-muted">
              This dashboard displays all the challenges you have
              participated in. Keep moving!
            </p>
            <p>
              {/* <a href="/placeholder" class="btn btn-primary my-2">My Challenges</a> */}
              <a href="/challenges" class="btn btn-secondary my-2">
                Community Challenges
              </a>
            </p>
          </div>
        </div>
      </section>

      <Header header="MY CHALLENGES"/>
      <div className="table-responsive">
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
      </div>


    </div>
  );
};

export default DashBoard;
