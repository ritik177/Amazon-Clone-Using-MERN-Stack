import React, { useState, useContext } from "react";
import "./signup.css";
import { NavLink } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LoginContext } from "../context/ContextProvider";
import { url } from "../../constant";


const Sign_in = () => {


  const [logdata,setData] = useState({
    email:"",
    password:""
  });
  console.log(logdata);

  const {account , setAccount} = useContext(LoginContext);
  
  const history = useNavigate();



const adddata = (e)=>{
  const {name , value}= e.target;

  setData(()=>{
    return{
      ...logdata,
      [name]:value
    }
  })
}


const senddata = async(e)=>{
  e.preventDefault();
  const { email, password } = logdata;

  const res = await fetch(`${url}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email, password 
    })
  });

  const data =  await res.json ();
  console.log(data);

  if (res.status === 400 || !data ){
    console.log("invalid details");
    toast.warn("Invalid details",{
      position: "top-center"
    })
  }else{
    console.log("data valid ");
    setAccount(data);
    toast.success("You are successfully login",{
      position: "top-center"
    })
    setData ({...logdata , email:"", password:""});
    history("/");
  }


}


  return (
    <>
      <section>
        <div className="sign_container">
          <div className="sign_header">
            <img src="./blacklogoamazon.png" alt="amazonlogo" />
          </div>
          <div className="sign_form">
            <form method="POST">
              <h1>Sign-In</h1>
              <div className="form_data">
                <label htmlFor="email">Email</label>
                <input type="text" 
                onChange={adddata}
                value={logdata.email}
                name="email" id="email" />
              </div>
              <div className="form_data">
                <label htmlFor="password">Password</label>
                <input type="password" 
                onChange={adddata}
                value={logdata.password}
                name="password" id="password" placeholder="At least 6 character" />
              </div>
              <button className="signin_btn" onClick={senddata}>Continue</button>
            </form>
          </div>
          <div className="create_accountinfo">
            <p>New To Amazon</p>
            <NavLink to="/register"><button> Create Your Amazon Account</button></NavLink> 
          </div>
        </div>
        <ToastContainer />
      </section>
    </>
  );
};

export default Sign_in;
