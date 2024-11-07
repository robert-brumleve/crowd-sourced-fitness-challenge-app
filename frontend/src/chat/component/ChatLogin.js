import { React, useEffect, useState } from "react";
import "../chatroom.css";
import { auth, db } from "../lib/firebase";
import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";

const ChatLogin = () => {
  const provider = new GoogleAuthProvider();
  //const auth = getAuth();
  const [user, setUser] = useState(null);

  //console.log("UserProvider:", user);

  const googleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        setUser(result.user);
        console.log(result.user);
        registerUser(result.user);
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
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  const registerUser = async (user) => {
    try {
      const userRef = doc(db, "users", user.uid);
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
