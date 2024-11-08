import { React, useEffect, useState } from "react";
import "../chatroom.css";
import { auth, db } from "../lib/firebase";
import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { useChatStore } from "../lib/ChatStore";

const ChatLogin = () => {
  const provider = new GoogleAuthProvider();
  //const auth = getAuth();
  const [user, setUser] = useState(null);
  const {resetChat} = useChatStore();

  //console.log("UserProvider:", user);

  const googleSignIn = () => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        setUser(result.user);
        //console.log(result.user);
        await registerUserIfNotExists(result.user);
      })
      .catch((error) => {
        console.log(error.message);
      });

    //signInWithRedirect(auth, provider);
    //setUser(true);
  };
  const googleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        console.log("signout success");
        setUser(null);
        resetChat();
        
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  const registerUserIfNotExists = async (user) => {
    try {
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      //check user existence in database
      if (!userSnap.exists()){
        const userData = {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        challengelist: [],
        };
        //userdata
        await setDoc(userRef, userData);
        //chatdata
        await setDoc(doc(db, "userchats", user.uid), {
          chats: [],
        });
        console.log("new user registered: ", user.displayName);
      }else{
        console.log("user already exists");
      }
      
    } catch (error) {
      console.error("error registering", error);
    }
  };

  //listen for auth state changes
  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => {
      unSub();
    };
  }, []);

  return (
    <div className="chatlogin">
      {user ? (
        <>
          <button onClick={googleSignOut} type="button">
            sign out
          </button>
          <p> user: {user.displayName}</p>
        </>
      ) : (
        <button onClick={googleSignIn} type="button">
          google sign in
        </button>
      )}
    </div>
  );
};

export default ChatLogin;
