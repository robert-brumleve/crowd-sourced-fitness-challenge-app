//This code is based from
// https://firebase.google.com/docs/firestore/query-data/listen
// https://firebase.google.com/docs/firestore/query-data/get-data

import React, { useEffect, useState } from "react";
import "./chatroom.css";

import { useUserStore } from "./lib/UserStore";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from"./lib/firebase";

const ChatList = () => {

  const{currentUser} = useUserStore();
  const [chats, setChats] =useState([]);

  useEffect(()=>{
    const unsub = onSnapshot(doc(db, "userchats", currentUser.uid), async (res) => {
      const items = res.data().chats;
      
      const promises = items.map(async(item)=>{
        const userDocRef = doc(db, "users", item.receiverId);
        const userDocSnap = await getDoc(userDocRef);

        const user = userDocSnap.data();

        return{...item, user};
      });

      const chatData = await Promise.all(promises);
      /* sort list by updated status*/
      setChats(chatData.sort((a,b)=>b.updatedAt - a.updatedAt));
    });

    return()=>{
      unsub();
    }
  },[currentUser.uid])


  return (
    <div class="chatlist">

      {/* USER INFO */}

      <div class="userinfo">
        <div class="user">
          <img src={currentUser.photoURL || "/img//chat/avatar.png"} alt="" />
          <h5>{currentUser.displayName}</h5>
        </div>

        {/*user information - to add later*/}
        <div class="icons"></div>
      </div>

      {/* USER'S CHALLENGE LIST' */}

      <div class="challengelist">
        
        {chats.map((chat) =>(
          <div class="item" key={chat.chatId}>
            <img src="img/chat/fitness.png" alt="" />
            <div class="texts">
              <span>:challenge name</span>
              <p>{chat.lastMessage}</p>
            </div>
          </div>
        )

        
          
        )}

        

      </div>
    </div>
  );
};

export default ChatList;
