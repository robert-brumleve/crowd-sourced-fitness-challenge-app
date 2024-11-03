import React, { useEffect } from "react";
import ChatList from "./ChatList";
import ChatBox from "./ChatBox";
import ChatLogin from "./ChatLogin";
import { auth } from "./lib/firebase";
//import {getAuth} from 'firebase/auth'
//import {UserProvider, UserContext} from './UserContext'

import "./chatroom.css";
import { onAuthStateChanged } from "firebase/auth";
import { useUserStore } from "./lib/UserStore";

function ChatRoom() {
  const { currentUser, fetchUserInfo } = useUserStore();
  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      fetchUserInfo(user?.uid);
    });

    return () => {
      unSub();
    };
  }, [fetchUserInfo]);

  return (
    <div class="container">
      {currentUser ? (
        <>
          <ChatList />
          <ChatBox />
          <ChatLogin />
        </>
      ) : (
        <>
          <ChatLogin />
        </>
      )}
    </div>
  );
}

export default ChatRoom;
