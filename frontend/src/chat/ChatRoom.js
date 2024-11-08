import React, { useEffect } from "react";
import ChatList from "./ChatList";
import ChatBox from "./ChatBox";
import ChatLogin from "./component/ChatLogin";
import { auth } from "./lib/firebase";
//import {getAuth} from 'firebase/auth'
//import {UserProvider, UserContext} from './UserContext'

import "./chatroom.css";
import { onAuthStateChanged } from "firebase/auth";
import { useUserStore } from "./lib/UserStore";
import { useChatStore } from "./lib/ChatStore";

function ChatRoom() {
  const { currentUser, fetchUserInfo } = useUserStore();
  const { chatId, resetChat } = useChatStore();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      fetchUserInfo(user?.uid);
      console.log("user?:", user?.uid);
      //reset chat when new user is in
      
    });

    return () => {
      unsub();
    };
  }, [fetchUserInfo]);

  //console.log(currentUser);

  return (
    <div className="container">
      {currentUser ? (
        <>
          <ChatList />
          {chatId && <ChatBox />}
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
