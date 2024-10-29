import React from 'react'
import './chatroom.css'
import UserInfo from './chatlist/UserInfo'
import ChallengeList from './chatlist/ChallengeList'

const ChatList = () => {
  return (
    <div class="chatlist">
      <UserInfo/>
      <ChallengeList/>
    </div>
  )
}

export default ChatList