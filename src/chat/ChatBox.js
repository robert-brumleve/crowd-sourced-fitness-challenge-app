import React, { useState } from 'react'
import './chatroom.css'

const ChatBox = () => {
  const [text, setText] = useState("");

  console.log(text);
  return (
    <div class="chatbox">

      <div class="top">
        <div class="challenge">
          :challenge name
        </div>
        <div class="icons">
          <img src="img/chat/info.png" alt=""/>
        </div>
      </div>

      <div class="center">
      </div>

      <div class="bottom">
        <div class="icons">
          <img src="img/chat/picture.png" alt=""/>
        </div>
        <input 
        type="text" 
        placeholder="Type a message..."
        onChange={e=>setText(e.target.value)}/>
        <button class="sendButton">Send</button>
      </div>

    </div>
  )
}

export default ChatBox