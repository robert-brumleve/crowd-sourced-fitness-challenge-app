//This code is based
// https://firebase.google.com/docs/firestore/manage-data/add-data

import React, { useRef, useState, useEffect } from "react";
import "./chatroom.css";
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
  
  const { currentChatId, fetchChatInfo, currentChat } = useChatStore();
  const { currentUser } = useUserStore();
  const lastMessageRef = useRef(null);

  /* TODO fix auto scroll not working atm*/
  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollTop =
      lastMessageRef.current.scrollHeight; //({ behavior: "smooth" });
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
  const unsub = onSnapshot(doc(db, "chats", currentChatId), async(res) => {
    const items = res.data().messages;

    const promises = items.map(async(item)=>{
      const senderDocRef = doc(db, "users", item.senderId);
      const senderDocSnap = await getDoc(senderDocRef);
      const sender = senderDocSnap.data();
      return{...item, sender};
    });
    const senderData = await Promise.all(promises);
    setChat(senderData);
  });

  return () => {
    unsub();
  };
}, [currentChatId]);
  /*TODO:fetch other user info from messager senderid*/

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
          {currentChatId}
        </div>
        <div className="icons">
          <img src="img/chat/info.png" alt="" />
        </div>
      </div>

      {/* Message Section */}
      <div className="center" ref={lastMessageRef}>
        {chat?.map((message) => (
          <div
            className={
              message.senderId === currentUser.uid ? "message mine" : "message"
            }
            key={message.createdAt}
          >
            {/* show image and name if message is not current user's */}
            {message.senderId !== currentUser.uid && 
            <img src={ message.sender.photoURL || "/img/chat/avatar.png" } alt="." />}

            <div className="texts">
              {message.senderId !== currentUser.uid && (
                <span className="names">{message.sender.displayName}</span>
              )}
              {message.img && <img src={message.img} alt="" />}
              <p>{message.text}</p>
              <span>{message.createdAt.toDate().toLocaleDateString() + " @ "+
              message.createdAt.toDate().toLocaleTimeString()}</span>
            </div>
          </div>
        ))}
      </div>

      {/* auto scroll to bottom */}
      <div ref={lastMessageRef} />

      {/* TEXT INPUT - TODO: make enter key handle event as well. */}
      <div className="bottom">
        <div className="icons">
          <label htmlFor="file">
            <img src="img/chat/add.png" alt="Attach" />
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
          <img src="img/chat/send.png" alt="Send" onClick={handleSend} />
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
