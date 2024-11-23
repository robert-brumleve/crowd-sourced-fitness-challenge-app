import {
  arrayUnion,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../lib/firebase";
import createChat from "./CreateChat";

const createUserChat = async (uid, cid, cname) => {
  const userId = uid.toString();
  const challengeId = cid.toString();
  const challengeName = cname;

  const chatRef = doc(db, "chats", challengeId);
  const userChatRef = doc(db, "userchats", userId);
  try {
    const chatSnap = await getDoc(chatRef);
    const userChatSnap = await getDoc(userChatRef);
    //create a chat for pre-existing challenge not added to firebase
    if (!chatSnap.exists()) {
      createChat(challengeId, challengeName);
    }
    
    if (!userChatSnap.exists()) {
      await setDoc(userChatRef, {
        chats: [],
      });
      
    } 

    const chatData = {
      chatId: challengeId,
      lastMessage: "",
      type: "",
      updatedAt: null,
    };
    
    await updateDoc(userChatRef, {
      chats: arrayUnion(chatData),
    });
    //add user to chat participant
    await updateDoc(chatRef, {
      participantId: arrayUnion({
        uid: userId,
      }),
    });
  } catch (err) {
    console.log(err);
  }
};

export default createUserChat;
