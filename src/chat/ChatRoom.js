import React, { useState } from 'react';
import ChatList from './ChatList';
import ChatBox from './ChatBox';


import './chatroom.css';

import {auth} from "./firebase";
import {GoogleAuthProvider, signInWithRedirect} from "firebase/auth";

function ChatRoom() {
  const [user, setUser] = useState(false);
  /*
  const googleSignIn = () =>{
    auth.signInWithPopup(GoogleAuthProvider());
    //or auth.signInWithRedirect(auth, GoogleAuthProvider());
    //setUser(true);
  };
  const signOut = () =>{
    auth.signOut();
    //setUser(false);
  };
  */
  return(    
    <div class="container"> 

      <ChatList/>
      <ChatBox/>
      
    </div>
  
  );
}
/*
      {user ?(<button onClick={signOut} type="button">
        sign out
        </button>
      ):( 
      <button onClick={googleSignIn} type="button">
        sign in
        </button>
      )};
      */

export default ChatRoom;