import { Avatar, IconButton } from "@material-ui/core";
import React, {useState, useEffect} from "react";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import "./Sidebar.css";
import { Search } from "@material-ui/icons";
import SidebarChat from "./SidebarChat";
import {db} from './firebase';
import { useStateValue } from "../StateProvider";
import { Link } from "react-router-dom";
import firebase from 'firebase';
function Sidebar() {
  const [{user},dispatch] = useStateValue();
  const [groups, setGroups] = useState([]);
  useEffect(() =>{
    db.collection('rooms').onSnapshot(snapshot => (
      setGroups(snapshot.docs.map(doc =>
        ({
          id: doc.id,
          data: doc.data()
      })
      ))
    ))
  },[]);
  const logout = () =>{
    if(user)
    {
      firebase.auth().signOut();
    }
  }
  console.log(groups);
  return (
    <div className="sidebar">
      <div className="sidebar_header">
        {user?(
          <Link to="/">
          <Avatar src={user.photoURL} onClick = {logout}/>
          </Link>
        ):(
          <Avatar/>
        )}
        <div className="sidebar_headerRight">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="sidebar_search">
         <div className="sidebar_search_container">
         <Search/>
          <input type="text" placeholder="Search for a chat here"/>
         </div>
      </div>
      <div className="sidebar_chats">
          <SidebarChat createNewChat/>
          {
            groups.map(group => (
              <SidebarChat key = {group.id} id = {group.id} name={group.data.name}/>
            ))
          }
      </div>
    </div>
  );
}

export default Sidebar;
