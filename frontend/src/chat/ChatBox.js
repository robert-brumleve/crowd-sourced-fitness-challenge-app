//This code is based
// https://firebase.google.com/docs/firestore/manage-data/add-data

import React, { useRef, useState, useEffect } from "react";
import "./chatroom.css";
import "boxicons/css/boxicons.min.css";
import {
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "./lib/firebase";
import { useChatStore } from "./lib/ChatStore";
import { useUserStore } from "./lib/UserStore";
//import upload from "./component/Upload";

const ChatBox = () => {
  const [text, setText] = useState("");
  const [chat, setChat] = useState();
  
  const { currentChatId, fetchChatInfo, currentChat, participants } = useChatStore();
  const { currentUser } = useUserStore();
  const lastMessageRef = useRef(null);

  /* auto scroll to last message*/
  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" }); 
    }
  }, [chat]);

  //listen for chat
  useEffect(() => {
    const unsub = fetchChatInfo(currentChatId);

    return () => {
      if (typeof unsub === "function") {
        
        unsub();
      }
    };
  }, [currentChatId, fetchChatInfo]);

  //listens for each messages
  useEffect(() => {
    const unsub = onSnapshot(doc(db, "chats", currentChatId), async (res) => {
      const items = res.data().messages;
      //retrieve sender info from each message for display
      const promises = items.map(async (item) => {
        const senderDocRef = doc(db, "users", item.senderId);
        const senderDocSnap = await getDoc(senderDocRef);
        const sender = senderDocSnap.data();
        return { ...item, sender };
      });
      const senderData = await Promise.all(promises);
      setChat(senderData);
    });

    return () => {
      unsub();
    };
  }, [currentChatId]);

  /*TODO: handle image upload*/

  const handleSend = async () => {
    if (text === "") return;

    try {
      await updateDoc(doc(db, "chats", currentChatId), {
        messages: arrayUnion({
          senderId: currentUser.uid,
          text,
          createdAt: new Date(),
        }),
      });

      //console.log("userid: ",currentUser.uid);
      //console.log("participants",currentChat.participantId);
      //console.log("other id: ",user);
      const userIds = currentChat.participantId;
      //update status of last message seen for each users.
      userIds.forEach(async (userchatsId) => {
        const userChatsRef = doc(db, "userchats", userchatsId);
        const userChatsSnapshot = await getDoc(userChatsRef);

        if (userChatsSnapshot.exists()) {
          const userChatsData = userChatsSnapshot.data();

          //find index of the matching chat
          const chatIndex = userChatsData.chats.findIndex(
            (c) => c.chatId === currentChatId
          );

          userChatsData.chats[chatIndex].lastMessage = text;
          userChatsData.chats[chatIndex].isSeen =
            userchatsId === currentUser.uid ? true : false;
          userChatsData.chats[chatIndex].updatedAt = Date.now();

          await updateDoc(userChatsRef, {
            chats: userChatsData.chats,
          });
        }
      });
    } catch (err) {
      console.log(err);
    }

    //update text input
    setText("");
  };


  return (
    <div className="chatbox">
      <div className="top">
        <div className="challenge">
          {/*TODO: change to challenge name later */}
          <span className="name">
            {currentChatId}
          </span>
          {/* get number of participants */}
          <span className="usernum">( {participants.length} members )</span>
        </div>
        
        <div className="homeicon">
          {/*TODO: link to the challenge page*/}
          <i className="bx bx-home bx-sm"></i>
        </div>
      </div>

      {/* Message Section */}
      <div className="center" >
        {chat?.map((message) => (
          
          <div
            className={
              message.senderId === currentUser.uid ? "message mine" : "message"
            }
            key={message.createdAt}
            ref={lastMessageRef}
          >
            {/* show image and name if message is not current user's */}
            {message.senderId !== currentUser.uid && (
              <img
                className="user-pic"
                src={message.sender.photoURL || "/img/chat/avatar.png"}
                alt="."
              />
            )}

            <div className="texts">
              {message.senderId !== currentUser.uid && (
                <span className="names">{message.sender.displayName}</span>
              )}
              {message.img && (
                <img className="msg-img" src={message.img} alt="" />
              )}
              <p>{message.text}</p>
              <span>
                {message.createdAt.toDate().toLocaleDateString() +
                  " @ " +
                  message.createdAt.toDate().toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* auto scroll to bottom */}
      {/*<div ref={lastMessageRef} />*/}

      {/* TEXT INPUT - TODO: make enter key handle event as well. */}
      <div className="bottom">
        <div className="icons">
          <label htmlFor="file">
            <i className="bx bx-image-add bx-sm"></i>
          </label>
          <input type="file" id="file" style={{ display: "none" }} />
        </div>
        <input
          type="text"
          placeholder="Type a message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button className="sendButton">
          <i className="bx bx-send bx-sm" onClick={handleSend} />
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
