import React, { useEffect, useState } from "react";
import ChatList from "./ChatList";
import ChatBox from "./ChatBox";
import ChatLogin from "./component/ChatLogin";
import { auth } from "./lib/firebase";
//import {getAuth} from 'firebase/auth'
//import {UserProvider, UserContext} from './UserContext'

import "./chatroom.css";
import "boxicons/css/boxicons.min.css";
import { onAuthStateChanged } from "firebase/auth";
import { useUserStore } from "./lib/UserStore";
import { useChatStore } from "./lib/ChatStore";

function ChatRoom() {


  const { currentUser, fetchUserInfo } = useUserStore();
  const { currentChatId } = useChatStore();
  const [isMobileView, setIsMobileView] = useState(false);
  const [activeListView,setActiveListView] =useState(true);

  //listen for user
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      fetchUserInfo(user?.uid);
      //console.log("user?:", user?.uid);
      
    });

    return () => {
      unsub();
    };
  }, [fetchUserInfo]);

  //listen for window size change
  useEffect(() => {
    const handleResize = () => setIsMobileView(window.innerWidth <=500);
    handleResize();
    window.addEventListener("resize", handleResize);
    return ()=>{
      window.removeEventListener("resize",handleResize);
    }
  },[]);

  return (
    <div className="chatContainer">
      {currentUser ? (
        !isMobileView?(
          <>
          <ChatList />
          {currentChatId && <ChatBox />}
          <ChatLogin />
          </>
        ) :(
          <>
          {activeListView ? 
            <ChatList/> : <ChatBox/> }
           <nav className="nav_menu" >
            <ul className="nav_list">
              <li 
              >
                <button  className={activeListView ? "active" : ""}
                onClick={()=>setActiveListView(prevState => !prevState)}>
                <i class={activeListView ? 'bx bx-chat bx-sm':'bx bx-list-ul bx-sm'}></i>
                </button>
                
              </li>
              {/*
              <li  
              >
                <button  className={!activeListView ? "active" : ""}
                onClick={() => setActiveListView(false)}>
                  <i class='bx bx-chat'></i>
                <span>Chat</span>
                </button>
                
              </li>*/}
            </ul>
              
           </nav>
          </>
          
        )
        
      ) : (
        <>
          <ChatLogin />
        </>
      )}
    </div>
  );
}

export default ChatRoom;
