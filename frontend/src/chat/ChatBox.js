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
  

  const { chatId, user } = useChatStore();
  const { currentUser } = useUserStore();
  const lastMessageRef = useRef(null);
  /* TODO fix auto scroll not working atm*/
  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  /*fetch messages*/
  useEffect(() => {
    const unsub = onSnapshot(doc(db, "chats", chatId), (res) => {
      setChat(res.data());
    });

    return () => {
      unsub();
    };
  }, [chatId]);

  /*TODO:fetch other user info from messager senderid*/

  /*TODO: handle image upload*/

  const handleSend = async () => {
    if (text === "") return;

    try {
      await updateDoc(doc(db, "chats", chatId), {
        messages: arrayUnion({
          senderId: currentUser.uid,
          text,
          createdAt: new Date(),
        }),
      });

      const userIds = [currentUser.uid, user.uid];
      userIds.forEach(async (uid) => {
        const userChatsRef = doc(db, "userchats", uid);
        const userChatsSnapshot = await getDoc(userChatsRef);

        if (userChatsSnapshot.exists()) {
          const userChatsData = userChatsSnapshot.data();

          //find index of the latest chat
          const chatIndex = userChatsData.chats.findIndex(
            (c) => c.chatId === chatId
          );

          userChatsData.chats[chatIndex].lastMessage = text;
          userChatsData.chats[chatIndex].isSeen =
            uid === currentUser.uid ? true : false;
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
          {chatId}
        </div>
        <div className="icons">
          <img src="img/chat/info.png" alt="" />
        </div>
      </div>

      <div className="center">
        {chat?.messages?.map((message) => (
          <div
            className={
              message?.senderId === currentUser.uid ? "message mine" : "message"
            }
            key={message?.createdAt}
          >
            {/* show image and name if message is not current user's */}
            {message.senderId !== currentUser.uid && <img src="" alt="" />}

            <div className="texts">
              {message.senderId !== currentUser.uid && (
                <span>{message.senderId}</span>
              )}
              {message.img && <img src={message.img} alt="" />}
              <p>{message.text}</p>
              {/*<span>{message}</span>*/}
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
