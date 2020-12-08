import React, { useEffect} from "react";
import Sidebar from "../component/Sidebar";
import "./Whatsapp.css";
import Chat from "../component/Chat";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./Login";
import { auth } from "../component/firebase";
import { useStateValue } from '../StateProvider';
function Whatsapp() {
  const [{user},dispatch] = useStateValue();
  const logo = require('./iCoder.png');
  useEffect(()=>{
    auth.onAuthStateChanged(authUser => {
      console.log("USER ->", authUser);
      if(authUser){
        dispatch({
          type: 'SET_USER',
          user: authUser
        })
      }
      else{
        dispatch({
          type: 'SET_USER',
          user: null
        })
      }
    })
  },[])
  return (
    <div className="whatsapp_page">
      <div className="whatsapp_container">
       {user?(
          <Router>
          <Sidebar />
          <Switch>
            <Route path="/groups/:grpid">
              <Chat />
            </Route>
            <Route path="/">
              <Chat />
            </Route>
          </Switch>
        </Router>
       ):(<Login/>)}
      </div>
      <div className="footer">
      <p>&copy; Coding with Sammit</p>
      </div>
    </div>
  );
}

export default Whatsapp;
