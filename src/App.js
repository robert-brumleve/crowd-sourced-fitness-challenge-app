import React from "react";
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

// import Users from "./user/pages/Users";
// import NewChallenge from "./challenges/pages/NewChallenge";
// import UserChallenges from "./challenges/pages/UserChallenges";
// import UpdateChallenge from "./challenges/pages/UpdateChallenge";
import Navbar from "./navigations/Navbar";
import NewChallenge from "./challenges/NewChallenge";
import UserChallenges from "./challenges/UserChallenges";
import UpdateChallenge from "./challenges/UpdateChallenge";
import DashBoard from "./dashboard/DashBoard";
import AllChallenges from "./challenges/AllChallenges";
import NewAccount from "./account/NewAccount";
import ChatRoom from "./chat/ChatRoom";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" exact element={<DashBoard />} />
        <Route path="/account" element={<NewAccount />} />
        <Route path="/challenges" element={<AllChallenges />} />
        <Route path="/:userId/challenges" element={<UserChallenges />} />
        <Route path="/challenges/new" element={<NewChallenge />} />
        <Route path="/challenges/:cId" element={<UpdateChallenge />} />
        <Route path="*" element={<Navigate to="/" />} />
        {/* chat room should possibly be /:uid/chatroom/:chat_id */}
        <Route path="/chatroom" element={<ChatRoom/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
