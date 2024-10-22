import React, { useState } from "react";

import Card from "../others/Card";

import DATA_CHALLENGES from "../DUMMY_DATAS";
import NewChallenge from "./NewChallenge";

const AllChallenges = (props) => {
  const [challenges, setChallenges] = useState([]);

  function addChallenge(newChallenge) {
    setChallenges((preChallenges) => preChallenges.concat(newChallenge));
  }

  function deleteChallenge(id) {
    setChallenges(preChallenges => {
      return preChallenges.filter((challengeItem, index) => {
        return index != id;
      })
    })
  }
 

  return (
    <div>
      <NewChallenge onAdd={addChallenge} />
      <h1 className="heading">ALL CHALLENGES</h1>
      <div>
        {challenges.map((item, index) => {
          return (
            <Card
              key={index}
              id={index}
              name={item.name}
              //   img={item.imgURL}
              description={item.description}
              //   date={item.date}
              level={item.level}
              onDelete={deleteChallenge}
            />
          );
        })}
      </div>
    </div>
  );
};

export default AllChallenges;
