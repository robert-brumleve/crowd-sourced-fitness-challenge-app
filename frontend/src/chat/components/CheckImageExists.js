//This code is based from
// https://firebase.google.com/docs/storage/web/file-metadata

import { arrayRemove, doc, getDoc, updateDoc } from "firebase/firestore";
import { getStorage, ref, getMetadata } from "firebase/storage";
import { db } from "../lib/firebase";

const checkImageExists = async (chatId, images) => {
  const storage = getStorage();
  const promises = images.map(async (item) => {
    const imageRef = ref(storage, item.imgUrl);

    try {
      await getMetadata(imageRef);
    } catch (error) {
      //does not exist
      if (error.code === "storage/object-not-found") {
        //update images field
        updateDoc(doc(db, "chats", chatId), {
          images: arrayRemove(item),
        });

        //update messages field
        const chatRef = doc(db, "chats", chatId);
        const chatSnapshot = await getDoc(chatRef);
        if (chatSnapshot.exists()) {
          const chatData = chatSnapshot.data();
           
          const msgIndex = chatData.messages.findIndex(
            (c) => c.imgUrl && c.imgUrl === item.imgUrl
          );
          if (msgIndex != null) {
            chatData.messages[msgIndex].imgUrl = "";
            updateDoc(chatRef, {
              messages: chatData.messages,
            });

          }
            
        }
      }
    }
  });

  await Promise.all(promises);
};

export default checkImageExists;
