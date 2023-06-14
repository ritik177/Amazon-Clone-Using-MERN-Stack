import { React, useContext, useEffect } from "react";
import { LoginContext } from "../context/ContextProvider";
import Avatar from "@mui/material/Avatar";
import { NavLink } from "react-router-dom";
import { Divider } from "@mui/material";
import "./leftheader.css";

const Leftheader = ({logclose}) => {
  const { account, setAccount } = useContext(LoginContext);

  return (
    <>
      <div className="leftheader">
        <div className="left_nav">
          {
            account ? (
            <Avatar className="avtar2">{account.fname[0].toUpperCase()}</Avatar>
          ) : (
            <Avatar className="avtar"></Avatar>
          )}
          {account ? <h3>Hello , {account.fname.toUpperCase()}</h3>:""}
          </div>

          <div className="nav_btn" onClick={()=>logclose()}>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/">Shop By category</NavLink>

            <Divider style={{width:"100%",marginLeft:"-20px"}}/>

            <NavLink to="/">today's Deal</NavLink>
            {
              account ? <NavLink to="/buynow">Your orders</NavLink> : <NavLink to="/login">Your orders</NavLink>
            }
          <Divider style={{width:"100%",marginLeft:"-20px"}}/>
          
          <div className="flag">
            <NavLink to="/">Settings</NavLink> 
            <img src = "" alt=""/>
          </div>

          
        </div>
      </div>
    </>
  );
};

export default Leftheader;
