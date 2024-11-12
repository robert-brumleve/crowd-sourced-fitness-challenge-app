//This code is based from
// https://firebase.google.com/docs/firestore/query-data/listen
// https://firebase.google.com/docs/firestore/query-data/get-data

import React, { useEffect, useState } from "react";
import "./chatroom.css";

import { useUserStore } from "./lib/UserStore";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "./lib/firebase";
import AddUser from "./component/AddUser";
import { useChatStore } from "./lib/ChatStore";

const ChatList = () => {
  const { currentUser } = useUserStore();
  const { changeChat } = useChatStore();
  const [chats, setChats] = useState([]);
  const [addMode, setAddMode] = useState(false);

  /*TODO: change to challenge when database is connected*/
  useEffect(() => {
    const unsub = onSnapshot(
      doc(db, "userchats", currentUser.uid),
      async (res) => {
        const items = res.data().chats;

        const promises = items.map(async (item) => {
          const userDocRef = doc(db, "users", item.receiverId);
          const userDocSnap = await getDoc(userDocRef);

          const user = userDocSnap.data();
          return { ...item, user };
        });
        const chatData = await Promise.all(promises);
        /* sort list by updated status*/
        setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
      }
    );

    return () => {
      unsub();
    };
  }, [currentUser.uid]);

  /* handle when chat from the list is selected*/
  const handleSelect = async (chat) => {
    changeChat(chat.chatId);
  };

  return (
    <div className="chatlist">
      {/* USER INFO */}

      <div className="userinfo">
        <div className="user">
          <img src={currentUser.photoURL || "/img//chat/avatar.png"} alt="" />
          <h5>{currentUser.displayName}</h5>
        </div>

        {/*user information - to add later*/}
        <div className="icons"></div>
      </div>

      {/* Add User/challenge REMOVE LATER */}
      <div className="addChat">
        <button onClick={() => setAddMode((prev) => !prev)}>
          {addMode ? "minimize" : "add chat"}
        </button>
      </div>

      {/* USER'S CHALLENGE LIST' */}

      <div className="challengelist">
        {/*if chat list exists and at least one chat*/}
        {chats && chats.length >0 ? (
          chats.map((chat) => (
            <div
              className="item"
              key={chat.chatId}
              onClick={() => handleSelect(chat)}
            >
              <img src="img/chat/fitness.png" alt="" />
              <div className="texts">
                {/*TODO: change to challenge name */}
                <span>{chat.chatId}</span>
                <p>{chat.lastMessage}</p>
              </div>
            </div>
          ))
        ) : (
          <>
            {/*if no chat list from the data*/}
            <div className="item">
              {console.log("no list")}
              <img src="img/chat/fitness.png" alt="" />
              <div className="texts">
                <span>No challenges joined</span>
              </div>
            </div>
          </>
        )}
      </div>
      {/* search popup, delete later */}
      {addMode && <AddUser />}
    </div>
  );
};

export default ChatList;
