//This code is based
// https://firebase.google.com/docs/firestore/manage-data/add-data

import React, { useRef, useState, useEffect } from "react";
import "./lib/chatroom.css";
import "boxicons/css/boxicons.min.css";
import {
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "./lib/firebase";
import { useChatStore } from "./stores/ChatStore";
import { useUserStore } from "./stores/UserStore";
import upload from "./components/Upload";
import { useInputStore } from "./stores/InputStore";
import checkImageExists from "./components/CheckImageExists";
import { useChatDetailStore } from "./stores/ChatDetailStore";

const ChatBox = () => {
  const [chat, setChat] = useState();
  const { text, setText, resetInput, imgInput, setImgInput } = useInputStore();
  const { currentChatId, fetchChatInfo, currentChat, participants} = useChatStore();
  const { currentUser } = useUserStore();
  const lastMessageRef = useRef(null);
  const { chatDetail } = useChatDetailStore();

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

  //listens for each messages and get msg sender info
  useEffect(() => {
    const unsub = onSnapshot(doc(db, "chats", currentChatId), async (res) => {
      //exit if no chat found.
      if (res.data() == null) {
        console.log("cannot open chatbox. selected chat no longer exists");
        alert("Cannot retreive message as the chat no longer exists.");
        return;
      }

      //check for any deleted image from the database
      checkImageExists(currentChatId, res.data().images);

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

  // handle image upload
  const handleImg = (e) => {
    if (e.target.files[0]) {
      setImgInput(e.target.files[0]);
    }
  };

  //Handle when sending a message
  const handleSend = async () => {
    if (text === "" && imgInput.file == null) return;
    let imgURL = null;

    try {
      if (imgInput.file) {
        imgURL = await upload(imgInput.file);
        //console.log("img:", imgURL);
      }

      await updateDoc(doc(db, "chats", currentChatId), {
        messages: arrayUnion({
          senderId: currentUser.uid,
          text,
          createdAt: new Date(),
          ...(imgURL && { imgUrl: imgURL }),
        }),
        ...(imgURL && {
          images: arrayUnion({
            imgUrl: imgURL,
          }),
        }),
      });

      const userIds = currentChat.participantId;
      //update status of last message seen for each users.
      userIds.forEach(async (index) => {
        const userChatsRef = doc(db, "userchats", index.uid);
        const userChatsSnapshot = await getDoc(userChatsRef);

        if (userChatsSnapshot.exists()) {
          const userChatsData = userChatsSnapshot.data();

          //find index of the matching chat
          const chatIndex = userChatsData.chats.findIndex(
            (c) => c.chatId === currentChatId
          );
          //if only photo, set custom text
          if (text === "" && imgURL) {
            //console.log("text null and image exist");
            userChatsData.chats[chatIndex].type = "image";
          } else {
            userChatsData.chats[chatIndex].type = "text";
          }
          userChatsData.chats[chatIndex].lastMessage = text;
          userChatsData.chats[chatIndex].isSeen =
            index.uid === currentUser.uid ? true : false;
          userChatsData.chats[chatIndex].updatedAt = new Date();

          await updateDoc(userChatsRef, {
            chats: userChatsData.chats,
          });
        }
      });
    } catch (err) {
      console.log(err);
    }
    //update text input
    resetInput();
  };

  return (
    <div className="chatbox">
      {/*--- CHAT TITLE  ---- */}
      <div className="top">
        <div className="challenge">
          {/*TODO: change to challenge name later */}
          <img
                className="chal-pic"
                src={chatDetail[currentChatId].imageURL 
                  && chatDetail[currentChatId].imageURL}
                alt="."
              />
          <div className='info'>
            <span className="name">{chatDetail[currentChatId].name}</span>
          {/* get number of participants */}
          <span className="usernum">( {participants.length} members )</span>
          </div>
          
        </div>

        <div className="homeicon">
          {/*TODO: link to the challenge page*/}
          <i className="bx bx-home bx-sm"></i>
          
        </div>
      </div>

      {/* ---- MESSAGES ----*/}
      <div className="center">
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

              {message.imgUrl && (
                <img className="msg-img" src={message.imgUrl} alt="" />
              )}
              {message.imgUrl === "" && (
                <div className="removed">
                  <i className="bx bx-image"/>
                  <p>This image was deleted</p>
                  </div>
              )}
              {message.text !== "" && <p>{message.text}</p>}

              <span>
                {message.createdAt.toDate().toLocaleDateString() +
                  " @ " +
                  message.createdAt.toDate().toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* --- IMAGE UPLOAD PREVIEW ---*/}
      {imgInput.url && (
        <fieldset className="image-preview">
          <legend>preview</legend>
          <img src={imgInput.url} alt="" />
        </fieldset>
      )}

      {/* --- TEXT INPUT --- */}
      {/*//TODO: goal-make enter key handle event as well. */}
      <div className="bottom">
        <div className="icons">
          <label htmlFor="file">
            <i className="bx bx-image-add bx-sm"></i>
          </label>
          <input
            type="file"
            id="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleImg}
          />
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
