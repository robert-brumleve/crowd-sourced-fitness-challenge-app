//This code is based from
// https://firebase.google.com/docs/firestore/query-data/listen
// https://firebase.google.com/docs/firestore/query-data/get-data

import React, { useEffect, useState } from "react";
import "./chatroom.css";

import { useUserStore } from "./lib/UserStore";
import { arrayUnion, collection, doc, 
  getDoc, onSnapshot, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { db } from"./lib/firebase";
import AddUser from "./component/AddUser";

const ChatList = () => {

  const{currentUser} = useUserStore();
  const [chats, setChats] =useState([]);
  const [user] = useState([]);
  const [addMode, setAddMode] = useState(false);

  {/*TODO: change to challenge when database is connected*/}
  useEffect(()=>{
    const unsub = onSnapshot(doc(db, "userchats", currentUser.uid), async (res) => {
      const items = res.data().chats;
      
      const promises = items.map(async(item)=>{
        const userDocRef = doc(db, "users", item.receiverId);
        const userDocSnap = await getDoc(userDocRef);

        const user = userDocSnap.data();

        return{...item, user};
      });

      const chatData = await Promise.all(promises);
      /* sort list by updated status*/
      setChats(chatData.sort((a,b)=>b.updatedAt - a.updatedAt));
    });

    return()=>{
      unsub();
    }
  },[currentUser.uid])

  const handleAdd = async ()=>{

    const chatRef = collection(db,"chats");
    const userChatRef = collection(db,"userchats")
    
    try{
      const newChatRef = doc(chatRef);
      {/*creates new chat*/}
      await setDoc(newChatRef,{
        createdAt:serverTimestamp(),
        challengeId:"",
        challengeName:"",
        messages: [],
      })

      await updateDoc(doc(userChatRef, user.uid),{
        chats:arrayUnion({
          chatId: newChatRef.id,
          lastMessage:"",
          receiverId:currentUser.uid,
          updatedAt: Date.now(),
        })
      })
    }catch (err){
      console.log(err);
    }
  }

  return (
    <div className="chatlist">

      {/* USER INFO */}

      <div className="userinfo">
        <div className="user">
          <img src={currentUser.photoURL || "/img//chat/avatar.png"} alt="" />
          <h5>{currentUser.displayName}</h5>
        </div>

        {/*user information - to add later*/}
        <div className="icons"></div>
      </div>

      {/* Add User/challenge REMOVE LATER */}
      <div className="addChat">
      
      <input 
        type="text" 
        placeholder="search"
        />
        <button onClick={()=> setAddMode((prev) => !prev)}>
          {addMode ? "sub": "add"}
        </button>
          
      </div>


      {/* USER'S CHALLENGE LIST' */}

      <div className="challengelist">
        
        {chats.map((chat) =>(
          <div className="item" key={chat.chatId}>
            <img src="img/chat/fitness.png" alt="" />
            <div className="texts">
              <span>:challenge name</span>
              <p>{chat.lastMessage}</p>
            </div>
          </div>
        )
        )}
          {/*TODO: remove dummy example later */}
          <div className="item" >
            <img src="img/chat/fitness.png" alt="" />
            <div className="texts">
              <span>:challenge name</span>
              <p>chat.lastMessage</p>
            </div>
          </div>

      </div>
      {/* search popup, delete later */}
      {addMode && <AddUser/>}
    </div>
  );
};

export default ChatList;
