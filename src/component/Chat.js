import { Avatar, Button } from "@material-ui/core";
import { Call, Mic, MoreVert, Search } from "@material-ui/icons";
import LinkIcon from "@material-ui/icons/Link";
import React, {useState, useEffect} from "react";
import "./Chat.css";
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import SendIcon from '@material-ui/icons/Send';
import { useParams } from "react-router-dom";
import { db } from "./firebase";
import firebase from 'firebase';
import { useStateValue } from "../StateProvider";
function Chat() {
  const [input, setInput] = useState('');
  const { grpid } = useParams();
  const [groupName, setGroupName] = useState("");
  const [messages, setMessages] = useState([]);
  const [{user}, dispatch] = useStateValue();
  const sendMessage = (e) => {
    e.preventDefault();
    console.log(input);
    db.collection('rooms').doc(grpid).collection('messages').add({
      message: input,
      name: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    setInput("");
  }
  useEffect(() => {
    if(grpid){
      db.collection('rooms').doc(grpid).onSnapshot(snapshot => (
        setGroupName(snapshot.data().name)
      ))
      db.collection('rooms').doc(grpid).collection('messages').orderBy('timestamp','asc').onSnapshot(snapshot => (
        setMessages(snapshot.docs.map(doc=> doc.data()))
      ))
    }

  }, [grpid])
  return (
    <div className="chat">
      <div className="chatheader">
        <div className="chatheader_left">
          <Avatar />
          <div className="chatheader_left_details">
            <h3>{groupName}</h3>
            <p><span>Last seen at: </span>{messages[messages.length-1]?.timestamp?.toDate().toLocaleTimeString()}</p>
          </div>
        </div>
        <div className="chatheader_right">
          <Search />
          <Call />
          <LinkIcon />
          <MoreVert />
        </div>
      </div>
      <div className="chatbody">
        {messages.map((message)=>(
            <p className={`chat_message ${message.name===user.displayName && 'chat_reciever'}`}> <span className="chat_name">{message.name}</span>{message.message}<span className="chat_time">{new Date(message.timestamp?.toDate()).toLocaleTimeString()}</span></p>
        ))}
      </div>
      <div className="chatfooter">
        <InsertEmoticonIcon/>
        <form className="input_message">
            <input type="text" value={input} onChange = {e => setInput(e.target.value)} placeholder="Type your message here"/>
            <Mic/>
            <Button type="submit" onClick={sendMessage}><SendIcon/></Button>
        </form>
      </div>
    </div>
  );
}

export default Chat;
