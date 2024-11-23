import { deleteDoc, doc} from "firebase/firestore";
import { db } from "../lib/firebase";

const deleteChat = async (id) => {
    const chatId = id.toString();
    console.log("deleteChat", chatId);
  try {
    await deleteDoc(doc(db, "chats", chatId));
    console.log("Id ", chatId, " deleleted from firebase chats");
  } catch (err) {
    console.log(err);
  }
};

export default deleteChat;
