//This code is based from
// https://firebase.google.com/docs/firestore/query-data/listen
// https://firebase.google.com/docs/firestore/query-data/get-data

import React, { useEffect, useState } from "react";
import "./chatroom.css";

import "boxicons/css/boxicons.min.css";
import { useUserStore } from "./lib/UserStore";
import {
  arrayRemove,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "./lib/firebase";
import AddUser from "./component/AddUser";
import { useChatStore } from "./lib/ChatStore";
import { useInputStore } from "./lib/InputStore";

const ChatList = () => {
  const { currentUser } = useUserStore();
  const { changeChat, currentChatId } = useChatStore();
  const { resetInput } = useInputStore();
  const [chats, setChats] = useState([]);
  const [addMode, setAddMode] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const filteredChats = chats.filter((chatId) => chatId !== undefined);

  //TODO: change to challenge when mysql userhaschallenges is complete
  // Handle when a chat is deleted, remove the chat from the userchat
  useEffect(() => {
    const unsub = onSnapshot(
      doc(db, "userchats", currentUser.uid),
      async (res) => {
        const items = res.data().chats;

        const promises = items.map(async (item) => {
          const chatDocRef = doc(db, "chats", item.chatId);
          try {
            const chatDocSnap = await getDoc(chatDocRef);
            //add to the list if the chat does not exist
            if (!chatDocSnap.exists()) {
              updateDoc(doc(db, "userchats", currentUser.uid), {
                chats: arrayRemove(item),
              });
              console.log("removing deleted chat:", item.chatId);
            } else {
              return { ...item };
            }
          } catch (err) {
            console.log(err);
          }
        });
        const chatData = await Promise.all(promises);
        /* sort list by updated status*/
        setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
      }
    );

    return () => {
      unsub();
    };
  }, [currentUser.uid, refresh]);

  // handle when chat from the list is selected
  const handleSelect = async (chat) => {
    const userChatsRef = doc(db, "userchats", currentUser.uid);
    const userChatsSnapshot = await getDoc(userChatsRef);
    const chatDocRef = doc(db, "chats", chat.chatId);
    const chatDocSnap = await getDoc(chatDocRef);

    //continue if chat exists and user has chats
    if (userChatsSnapshot.exists() && chatDocSnap.exists()) {
      const userChatsData = userChatsSnapshot.data();
      //find index of the matching chat
      const chatIndex = userChatsData.chats.findIndex(
        (c) => c.chatId === chat.chatId
      );
      //console.log("chatIndex:", chatIndex);
      //exit if no index found.
      if (chatIndex == null) {
        console.log("selected chat no longer exists", chatIndex);
        alert("The chat no longer exists.");
        return;
      } else {
        userChatsData.chats[chatIndex].isSeen = true;
        await updateDoc(userChatsRef, {
          chats: userChatsData.chats,
        });
      }
      //change chatId
      changeChat(chat.chatId);
    } else {
      alert("Chat does not exist.");
    }
    //reset input field when different chat is selected
    resetInput();
    //refresh chatlist whenever selecting chat
    setRefresh((prev) => !prev);
  };

  return (
    <div className="chatlist">
      {/* USER INFO */}
      <div className="userinfo">
        <div className="user">
          {currentUser.photoURL ? (
            <img className="user-img" src={currentUser.photoURL} alt="" />
          ) : (
            <i className="bx bx-user-circle user-img"></i>
          )}
          <span>{currentUser.displayName}</span>
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
        {chats && chats.length > 0 ? (
          filteredChats.map((chat) => (
            <div
              className={chat.chatId === currentChatId ? "item active" : "item"}
              key={chat.chatId}
              onClick={() => handleSelect(chat)}
            >
              {/* Challenge photo */}
              {/* //TODO: change to challenge picture if mysql is made*/}
              <img className="chal-img" src="img/chat/fitness.png" alt="" />
              <div className="texts">
                {/*//TODO: change to challenge name */}
                <span>{chat.chatId}</span>
                <p className="lastMessage">
                  {chat.type === "text" ? (
                    chat.lastMessage
                  ) : chat.type === "image" ? (
                    <i className="bx bx-image">image</i>
                  ) : (
                    ""
                  )}
                </p>
              </div>
              {/* show icon if there is unread msg */}
              {chat.lastMessage === "" || chat.isSeen === true ? (
                <> </>
              ) : (
                <div className="unread-icon">
                  <i className="bx bx-message-rounded-detail"></i>
                </div>
              )}
            </div>
          ))
        ) : (
          <>
            {/*if no chat list from the data*/}
            <div className="item">
              <img src="img/chat/fitness.png" alt="" />
              <div className="texts">
                <span>No challenges joined yet</span>
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
