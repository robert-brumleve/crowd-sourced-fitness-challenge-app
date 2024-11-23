//This code is based from
// https://firebase.google.com/docs/firestore/query-data/listen
// https://firebase.google.com/docs/firestore/query-data/get-data

import React, { useEffect, useState } from "react";
import "./lib/chatroom.css";

import "boxicons/css/boxicons.min.css";
import { useUserStore } from "./stores/UserStore";
import {
  arrayRemove,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "./lib/firebase";
import { useChatStore } from "./stores/ChatStore";
import { useInputStore } from "./stores/InputStore";
import { useActiveTabStore } from "./stores/ActiveTabStore";
import axios from "axios";
import { useChatDetailStore } from "./stores/ChatDetailStore";

const ChatList = () => {
  const { currentUser } = useUserStore();
  const { changeChat, currentChatId  } = useChatStore();
  const { chatDetail, storeChatDetail } = useChatDetailStore();
  const { resetInput } = useInputStore();
  const { setActiveTab } = useActiveTabStore();
  const [chats, setChats] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const filteredChats = chats.filter((chatId) => chatId !== undefined);

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


  // Get challenge data to retreive challenge name and image
  useEffect(() => {
    axios
      .get(`http://localhost:5000/dashboard/userchallenges/${currentUser.uid}`)
      .then((res) => {
        let temporary = {}
        res.data.forEach(element => {
          temporary[element.challengeID.toString()] = element;
        });
        //console.log(temporary);
        storeChatDetail(temporary);
          })
      .catch((err) => console.log(err));
  }, [currentUser.uid,refresh,storeChatDetail]);


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
      //change to chat
      setActiveTab("chatbox");
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
          <img
            className="user-img"
            src={
              currentUser.photoURL
                ? currentUser.photoURL
                : "img/chat/avatar.png"
            }
            alt=""
          />
          <span>{currentUser.displayName}</span>
        </div>
        {/*user information - to add later*/}
        <div className="icons"></div>
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
              <img className="chal-img" 
              src={ chatDetail[chat.chatId].imageURL || "img/chat/fitness.png"} alt="" />
              <div className="texts">
                {/* challenge name */}
                <span>{chatDetail[chat.chatId].name}</span>
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
    </div>
  );
};

export default ChatList;
