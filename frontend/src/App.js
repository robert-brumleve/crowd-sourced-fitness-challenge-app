import React from "react";
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import DashBoard from "./dashboard/DashBoard";
import CommunityChallenges from "./challenges/CommunityChallenges";
import NewAccount from "./account/NewAccount";
import CreateChallenge from "./challenges/CreateChallenge";
import ViewChallenge from "./challenges/ViewChallenge";
import UpdateChallenge from "./challenges/UpdateChallenge";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" exact element={<DashBoard />} />
        <Route path="/account" element={<NewAccount />} />
        <Route path="/challenges" element={<CommunityChallenges />} />
        <Route path="/challenges/create" element={<CreateChallenge />} />
        <Route path="/challenges/view/:id" element={<ViewChallenge />} />
        <Route path="/challenges/update/:id" element={<UpdateChallenge />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
