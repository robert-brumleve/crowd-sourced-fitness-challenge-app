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

function ChatRoom() {
  const { currentUser, fetchUserInfo } = useUserStore();
  const { currentChatId } = useChatStore();
  const [isMobileView, setIsMobileView] = useState(false);
  const [activeTab, setActiveTab] = useState("chatlist");

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

  //listen for chatId switching and open chat
  useEffect(() => {
    if (!currentChatId) {
      setActiveTab("chatlist");
    } else {
      setActiveTab("chatbox");
    }
  }, [currentChatId]);

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
            {activeTab ? <ChatList /> : <ChatBox />}
            <nav className="nav_menu">
              <ul className="nav_list">
                <li>
                  <button
                    className={activeTab ? "active" : ""}
                    onClick={() => setActiveTab("chatlist")}
                  >
                    <i className="bx bx-list-ul"></i>
                  </button>
                </li>
                <li>
                  <button
                    className={!activeTab ? "active" : ""}
                    onClick={() =>
                      currentChatId
                        ? setActiveTab("chatbox")
                        : setActiveTab("chatlist")
                    }
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
