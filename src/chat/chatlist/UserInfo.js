import React from 'react'
import '../chatroom.css'

const UserInfo = () => {
  return (
    <div class='userinfo'>
      {/*user picture*/}
      <div class='user'>
        <img src="/img//chat/avatar.png" alt=""/>
        <h5>:username</h5>
      </div>

      {/*user information - to add later*/}
      <div class='icons'></div>
    </div>
  )
}

export default UserInfo