import React from "react";
import "./chatroom.css";

import { useUserStore } from "./lib/UserStore";

const ChatList = () => {

  const{currentUser} = useUserStore();

  return (
    <div class="chatlist">

      {/* USER INFO */}

      <div class="userinfo">
        <div class="user">
          <img src={currentUser.photo || "/img//chat/avatar.png"} alt="" />
          <h5>{currentUser.displayName}</h5>
        </div>

        {/*user information - to add later*/}
        <div class="icons"></div>
      </div>

      {/* USER'S CHALLENGE LIST' */}

      <div class="challengelist">
        <div class="item">
          <img src="img/chat/fitness.png" alt="" />
          <div class="texts">
            <span>:challenge name</span>
            <p>latest message</p>
          </div>
        </div>

        <div class="item">
          <img src="img/chat/fitness.png" alt="" />
          <div class="texts">
            <span>:challenge name</span>
            <p>latest message</p>
          </div>
        </div>

        <div class="item">
          <img src="img/chat/fitness.png" alt="" />
          <div class="texts">
            <span>:challenge name</span>
            <p>latest message</p>
          </div>
        </div>
        <div class="item">
          <img src="img/chat/fitness.png" alt="" />
          <div class="texts">
            <span>:challenge name</span>
            <p>latest message</p>
          </div>
        </div>

        <div class="item">
          <img src="img/chat/fitness.png" alt="" />
          <div class="texts">
            <span>:challenge name</span>
            <p>latest message</p>
          </div>
        </div>

        <div class="item">
          <img src="img/chat/fitness.png" alt="" />
          <div class="texts">
            <span>:challenge name</span>
            <p>latest message</p>
          </div>
        </div>

        <div class="item">
          <img src="img/chat/fitness.png" alt="" />
          <div class="texts">
            <span>:challenge name</span>
            <p>latest message</p>
          </div>
        </div>

        <div class="item">
          <img src="img/chat/fitness.png" alt="" />
          <div class="texts">
            <span>:challenge name</span>
            <p>latest message</p>
          </div>
        </div>

        <div class="item">
          <img src="img/chat/fitness.png" alt="" />
          <div class="texts">
            <span>:challenge name</span>
            <p>latest message</p>
          </div>
        </div>

        <div class="item">
          <img src="img/chat/fitness.png" alt="" />
          <div class="texts">
            <span>:challenge name</span>
            <p>latest message</p>
          </div>
        </div>

        <div class="item">
          <img src="img/chat/fitness.png" alt="" />
          <div class="texts">
            <span>:challenge name</span>
            <p>latest message</p>
          </div>
        </div>

        <div class="item">
          <img src="img/chat/fitness.png" alt="" />
          <div class="texts">
            <span>:challenge name</span>
            <p>latest message</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatList;
