import React, { useRef, useState, useEffect } from 'react'
import './chatroom.css'

const ChatBox = () => {
  const [ setText] = useState("");
  
  const lastMessageRef = useRef(null);
  /* TODO fix auto scroll not working atm*/
  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);
  
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
        <div class="message">
          <img src='img/chat/avatar2.jpg' alt=''/>
          <div class="texts">
            <span>:other_user_name</span>
            <p>
              This is a test message. qwertyasdfgzxcv.
            </p>
            <span>timestamp</span>
            
          </div>
        </div>
        <div class="message mine">
          <div class="texts">
            <p>
              This is a test message. qwertyasdfgzxcv.
            </p>
            <span>timestamp</span>
          </div>
        </div>
        
        <div class="message">
          <img src='img/chat/avatar2.jpg' alt=''/>
          <div class="texts">
          <span>:other_user_name</span>
          <img src='img/chat/pic_example.png' alt=''/>
            <p>
              This is a test message. qwertyasdfgzxcv.
            </p>
            <span>timestamp</span>
          </div>
        </div>
        <div class="message mine">
          
          <div class="texts">
            <img src='img/chat/pic_example2.png' alt=''/>
            <p>
              This is a test message. qwertyasdfgzxcv.
            </p>
            <span>timestamp</span>
          </div>
        </div>
        
      </div>

      {/* auto scroll to bottom */}
      <div ref={lastMessageRef} /> 

      <div class="bottom">
        <div class="icons">
          <img src="img/chat/add.png" alt="Attach"/>
        </div>
        <input 
        type="text" 
        placeholder="Type a message..."
        onChange={e=>setText(e.target.value)}/>
        <button class="sendButton">
          <img src='img/chat/send.png' alt='Send'/>
        </button>
      </div>

    </div>
  )
}

export default ChatBox