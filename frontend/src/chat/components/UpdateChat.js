import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../lib/firebase";

const updateChat = async (id, name) => {
    const selectedId = id.toString();
    const newName = name;
  try {
    const chatRef = doc(db, "chats", selectedId);
    const chatSnap = await getDoc(chatRef);
    if (chatSnap.exists()) {
      await updateDoc(chatRef, {
        challengeName: newName,
      });
    }

  } catch (err) {
    console.log(err);
  }
};

export default updateChat;
