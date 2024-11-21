import "../lib/chatroom.css";
import { db } from "../lib/firebase";
import { setDoc, doc, getDoc } from "firebase/firestore";

const login_chat = async () => {
  //Create user data to firebase if new
  const user = {
    username: localStorage.getItem("username"),
    userID: localStorage.getItem("userID"),
    email: localStorage.getItem("email"),
    picture: localStorage.getItem("profile_picture"),
  };
  try {
    const userRef = doc(db, "users", user.userID);
    const userSnap = await getDoc(userRef);

    //check user existence in database
    if (!userSnap.exists()) {
      const userData = {
        uid: user.userID,
        displayName: user.username,
        email: user.email,
        photoURL: user.picture,
      };
      //userdata
      console.log("user not in firebase data, creating new data");
      await setDoc(userRef, userData);
      //chatdata
      await setDoc(doc(db, "userchats", user.userID), {
        chats: [],
      });
      //console.log("new user registered: ", user.username);
    } else {
      console.log("user already exists in firebase, loggin in");
    }

    
  } catch (error) {
    console.error("error registering", error);
  }
};
export default login_chat;
