import "../lib/chatroom.css";
import { db } from "../lib/firebase";
import { setDoc, doc, getDoc } from "firebase/firestore";

const login_chat = async () => {
  //Create user data to firebase if new
  //console.log("fb", user.userID);
  const user = {
    username: localStorage.getItem("username"),
    userID: localStorage.getItem("userID"),
  };
  try {
    const userRef = doc(db, "users", user.userID);
    const userSnap = await getDoc(userRef);

    //check user existence in database
    if (!userSnap.exists()) {
      const userData = {
        uid: user.userID,
        displayName: user.username,
        photoURL: null,
      };
      //userdata
      console.log("inside usernap not exist");
      await setDoc(userRef, userData);
      //chatdata
      await setDoc(doc(db, "userchats", user.userID), {
        chats: [],
      });
      //console.log("new user registered: ", user.username);
    } else {
      console.log("user already exists");
    }

    
  } catch (error) {
    console.error("error registering", error);
  }
};
export default login_chat;
