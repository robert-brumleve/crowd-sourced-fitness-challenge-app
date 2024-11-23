import React, { useEffect, useState } from "react";
import ChatList from "./ChatList";
import ChatBox from "./ChatBox";
import "./lib/chatroom.css";
import "boxicons/css/boxicons.min.css";
import { useUserStore } from "./stores/UserStore";
import { useChatStore } from "./stores/ChatStore";
import { useActiveTabStore } from "./stores/ActiveTabStore";
import { useNavigate, Link } from "react-router-dom";

function ChatRoom() {
  const { currentUser, fetchUserInfo } = useUserStore();
  const { currentChatId} = useChatStore();
  const { activeTab, setActiveTab } = useActiveTabStore();
  const [isMobileView, setIsMobileView] = useState(false);
  const navigate = useNavigate();
  const [redirectMessage, setRedirectMessage] = useState("");
  const username = localStorage.getItem("username");
  const userID = localStorage.getItem("userID")?.toString();

  
  //listen for user status
  useEffect(() => {
    const unsub = () => {
      if (!username || !userID) {
        setRedirectMessage("You must log in to use the chat.");
        setTimeout(() => navigate("/login"), 5000);
      }

      fetchUserInfo(userID);
      //getChatListQuery(userID);
    };
    return () => {
      unsub();
    };
  }, [fetchUserInfo, userID, username, navigate, ]);

  //listen for window size change
  useEffect(() => {
    const handleResize = () => setIsMobileView(window.innerWidth <= 655);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  //Checks if chat is selected to switch to chatbox in mobileview
  const isChatSelected = () => {
    if (currentChatId) {
      setActiveTab("chatbox");
    } else {
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
          </>
        ) : (
          <>
            {activeTab === "chatlist" ? <ChatList /> : <ChatBox />}
            <nav className="nav_menu">
              <ul className="nav_list">
                <li>
                  <button
                    className={activeTab === "chatlist" ? "active" : ""}
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
          {redirectMessage && (
            <div className="text-center">
              <h3>{redirectMessage}</h3>
              <p>
                Click <Link to="/challenges">here</Link> to view all community
                challenges, or you will be redirected to login in 5 seconds.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default ChatRoom;
