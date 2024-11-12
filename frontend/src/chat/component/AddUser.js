//This code uses
// https://firebase.google.com/docs/firestore/query-data/queries
// https://firebase.google.com/docs/firestore/manage-data/add-data

import React, { useState } from 'react'
import "../chatroom.css"
import { arrayUnion, collection, doc,  getDocs, 
  query, serverTimestamp, setDoc, updateDoc, where } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useUserStore } from '../lib/UserStore';

const AddUser = () => {

    const [user,setUser] = useState(null);
    const {currentUser} = useUserStore();

    const handleSearch = async (e)=>{
        //console.log("in handlesearch");
        e.preventDefault();
        const formData = new FormData(e.target);
        const displayName = formData.get("displayName");
        //console.log(displayName);
        try{
            // Create a reference to the collection
            const userRef = collection(db, "users");
            console.log(userRef);
            // Create a query against the collection.
            const q = query(userRef, where("displayName", "==", displayName));

            const querySnapShot = await getDocs(q);
            
            if(!querySnapShot.empty){
                setUser(querySnapShot.docs[0].data());
            }

        }catch (err){
            console.log(err);
        }
    }

    /* Adds new chat */
    const handleAdd = async ()=>{

        const chatRef = collection(db,"chats");
        const userChatRef = collection(db,"userchats")
        
        try{
          const newChatRef = doc(chatRef);
          /*creates new chat*/
          await setDoc(newChatRef,{
            createdAt:serverTimestamp(),
            challengeId:"",
            challengeName:"",
            participantId:[],
            messages: [],
          })
          console.log(newChatRef);
          /*TODO: change receiverID to array for group chat */

          /**update other's userchat */
          await updateDoc(doc(userChatRef, user.uid),{
            chats:arrayUnion({
              chatId: newChatRef.id,
              lastMessage:"",
              receiverId:currentUser.uid,
              updatedAt: Date.now(),
            })
          })

          /**update user's userchat */
          await updateDoc(doc(userChatRef, currentUser.uid),{
            chats:arrayUnion({
              chatId: newChatRef.id,
              lastMessage:"",
              receiverId:user.uid,
              updatedAt: Date.now(),
            })
          })
          console.log("newchatid:",newChatRef.id);
          await updateDoc(doc(db, "chats",newChatRef.id),{
            participantId:arrayUnion(currentUser.uid, user.uid),
          })
        }catch (err){
          console.log(err);
        }
      }

  return (
    <div className="addUser">
        <form onSubmit={handleSearch}>
            <input type="text" placeholder="displayName" name="displayName"/>
            <button>search</button>
        </form>
        {user && <div className="user">
            <div className="detail">
                <span>{user.displayName} </span>
            </div>
            <button onClick={handleAdd}>add</button>
        </div>}

    </div>
  )
}

export default AddUser