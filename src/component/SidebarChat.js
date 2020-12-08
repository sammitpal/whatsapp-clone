import { Avatar } from "@material-ui/core";
import React, {useState} from "react";
import "./SidebarChat.css";
import { db } from "./firebase";
import { Link } from 'react-router-dom';
function SidebarChat({ id, name, createNewChat }) {
  const [lastMessage, setLastMessage] = useState("");
  const create = () => {
    const groupName = prompt("Enter Group Name");
    if (groupName) {
      db.collection("rooms").add({
        name: groupName,
      });
    }
  };
  db.collection('rooms').doc(id).collection('messages').orderBy('timestamp','desc').onSnapshot(snapshot => (
    setLastMessage(snapshot.docs.map(doc=> doc.data()))
  ))
  return !createNewChat ? (
    <Link to={`/groups/${id}`}>
        <div className="sidebar_chatRow">
      <Avatar />
      <div className="details">
        <h3>{name}</h3>
  <p>{lastMessage[0]?.message}</p>
      </div>
    </div>
    </Link>
  ) : (
    <div className="sidebar_chatRow">
      <h2 onClick={create}>Add New Chat</h2>
    </div>
  );
}

export default SidebarChat;
