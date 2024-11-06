import React from 'react'
import "../chatroom.css"

const AddUser = () => {
  return (
    <div className="addUser">
        <form>
            <input type="text" placeholder="Username" name="username"/>
            <button>search</button>
        </form>
        <div className="user">
            <div className="detail">
                <span> name </span>
            </div>
            <button>add</button>
        </div>
    </div>
  )
}

export default AddUser