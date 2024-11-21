import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../lib/firebase";

const createChat = async (id, name) => {
    const newID = id.toString();
    //console.log("createchat", newID);
    const newName = name;
    //console.log("createname", newName);
  try {
    const chatRef = doc(db, "chats", newID);
    const chatSnap = await getDoc(chatRef);
    if (!chatSnap.exists()) {
      const newChatData = {
        createdAt: serverTimestamp(),
        challengeId: newID,
        challengeName: newName,
        participantId: [],
        messages: [],
        images: [],
      };
      await setDoc(chatRef, newChatData);
    }

    //console.log(chatRef);
  } catch (err) {
    console.log(err);
  }
};

export default createChat;
