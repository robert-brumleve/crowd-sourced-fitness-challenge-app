import React, { useEffect, useState } from "react";
import ChatList from "./ChatList";
import ChatBox from "./ChatBox";
import ChatLogin from "./components/ChatLogin";
import { auth } from "./lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import "./lib/chatroom.css";
import "boxicons/css/boxicons.min.css";
import { useUserStore } from "./stores/UserStore";
import { useChatStore } from "./stores/ChatStore";
import { useActiveTabStore } from "./stores/ActiveTabStore";

function ChatRoom() {
  const { currentUser, fetchUserInfo } = useUserStore();
  const { currentChatId } = useChatStore();
  const {activeTab, setActiveTab} = useActiveTabStore();
  const [isMobileView, setIsMobileView] = useState(false);
  

  //listen for user
  //TODO: Change to SQL user data
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
    const handleResize = () => setIsMobileView(window.innerWidth <= 650);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  //Checks if chat is selected to switch to chatbox in mobileview
  const isChatSelected = () =>{
    if (currentChatId){
      setActiveTab("chatbox");
    }
    else{
      setActiveTab("chatlist");
      alert("Please select a chat first");
    }
  };

  return (
    <div className="chatContainer">
      {currentUser ? (
        !isMobileView ? (
          <>
            <ChatList />
            {currentChatId && <ChatBox />}
            <ChatLogin />
          </>
        ) : (
          <>
            {activeTab === "chatlist" ? <ChatList /> : <ChatBox />}
            <nav className="nav_menu">
              <ul className="nav_list">
                <li>
                  <button
                    className={activeTab === "chatlist"? "active" : ""}
                    onClick={() => setActiveTab("chatlist")}
                  >
                    <i className="bx bx-list-ul"></i>
                  </button>
                </li>
                <li>
                  <button
                    className={activeTab === "chatbox" ? "active" : ""}
                    onClick={isChatSelected}
                  >
                    <i className="bx bx-conversation"></i>
                  </button>
                </li>
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
