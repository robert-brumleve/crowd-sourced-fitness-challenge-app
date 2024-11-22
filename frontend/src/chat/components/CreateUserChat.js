import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../lib/firebase";

const createUserChat = async (uid, cid) => {
  const userId = uid.toString();
  const challengeId = cid.toString();

  const chatRef = doc(db, "chats", challengeId);
  const userChatRef = collection(db, "userchats");
  try {
    const chatSnap = await getDoc(chatRef);
    if (chatSnap.exists()) {
      //add chat to user
      await updateDoc(doc(userChatRef, userId), {
        chats: arrayUnion({
          chatId: challengeId,
          lastMessage: "",
          type: "",
          updatedAt: serverTimestamp(),
        }),
      });
      //add user to chat participant
      await updateDoc(chatRef, {
        participantId: arrayUnion({
          uid: userId,
        }),
      });
    }
  } catch (err) {
    console.log(err);
  }
};

export default createUserChat;
