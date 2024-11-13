//This code is based from
// https://firebase.google.com/docs/firestore/query-data/listen
// https://firebase.google.com/docs/firestore/query-data/get-data

import React, { useEffect, useState } from "react";
import "./chatroom.css";

import "boxicons/css/boxicons.min.css";
import { useUserStore } from "./lib/UserStore";
import { arrayRemove, doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "./lib/firebase";
import AddUser from "./component/AddUser";
import { useChatStore } from "./lib/ChatStore";

const ChatList = () => {
  const { currentUser } = useUserStore();
  const { changeChat, currentChatId } = useChatStore();
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

  // Handle when a chat is deleted, remove the chat from the userchat
  useEffect(() => {
    const unsub = onSnapshot(
      doc(db, "userchats", currentUser.uid),
      async (res) => {
        const items = res.data().chats;
        
        const chatIdToRemove = [];

        const promises = items.map(async (item) => {
          const chatDocRef = doc(db, "chats", item.chatId);
          
          try{
            const chatDocSnap = await getDoc(chatDocRef);
            //remove if chat does not exist anymore
            if(!chatDocSnap.exists()){
              //console.log("chatid ", item.chatId," does not exist anymore. removing.");
              chatIdToRemove.push(item);
              
              await  updateDoc(doc(db, "userchats",currentUser.uid),{
                chats: arrayRemove(item),
              });

            }
          }
          catch (err){
            console.log(err);
          }  

        });
        
        await Promise.all(promises);

      }
    );

    return () => {
      unsub();
    };
  }, [currentUser.uid]);


  // handle when chat from the list is selected
  const handleSelect = async (chat) => {
    //update isSeen status
    const userChatsRef = doc(db, "userchats", currentUser.uid);
    const userChatsSnapshot = await getDoc(userChatsRef);
    if (userChatsSnapshot.exists()) {
      const userChatsData = userChatsSnapshot.data();
      //find index of the matching chat
      const chatIndex = userChatsData.chats.findIndex(
        (c) => c.chatId === chat.chatId
      );
      userChatsData.chats[chatIndex].isSeen = true;
      await updateDoc(userChatsRef, {
        chats: userChatsData.chats,
      });
    }

    //change chatId
    changeChat(chat.chatId);
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
          chats.map((chat) => (
            <div
              className={chat.chatId === currentChatId ? "item active" : "item"}
              key={chat.chatId}
              onClick={() => handleSelect(chat)}
            >
              {/* Challenge photo */}
              {/*
              {currentUser.photoURL? 
              <img className="chal-img" src={:challenge_phto}/>
              :
            <i className="bx bx-run chal-img"></i>
            }
            */}
              <img className="chal-img" src="img/chat/fitness.png" alt=""/>
              <div className="texts">
                {/*TODO: change to challenge name */}
                <span>{chat.chatId}</span>
                <p className="lastMessage">{chat.lastMessage}</p>
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
