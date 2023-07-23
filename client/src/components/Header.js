import React from 'react'
import "./header.css"
import { Link, useNavigate } from "react-router-dom"
import SignUp from "../pages/SignUp.js"
import Login from "../pages/Login.js"
import { toast,ToastContainer } from 'react-toastify'
import axios from 'axios'



function Header() {
  const navigate=useNavigate();
  const handleLogout=async()=>{
    localStorage.removeItem("authtoken");
    localStorage.removeItem("email");
    await axios.get("/api/v1/users/logout")
    setTimeout(()=>{toast.success("Logout successfull",{
      autoClose:2000,
      hideProgressBar:true,
      position:"top-center"

    })},1)
    navigate("/login")
    
  }
  return (
    < div className="Container">
      <div className='nav-left'>
      <h1>HungryHub</h1>
      {(localStorage.getItem("authtoken")) && <div className='link'><Link to ="myorders">My orders</Link></div>}
      </div>
      
      
        
        {(localStorage.getItem("authtoken")) ? 
        (<div className='nav-right'>
        <div className='link' onClick={handleLogout}><Link to="/login" style={{'text-decoration':"none"}}>Logout</Link></div>
        <div className='link'><Link to="/cart"  style={{'text-decoration':"none"}}>MyCart</Link></div></div>)
        :
        (<div className='nav-right'><div className='link-signup'><Link to="/signup" style={{'text-decoration':"none"}}>SignUp</Link></div>
        <div className='link-login'><Link to="/login"  style={{'text-decoration':"none"}}>Login</Link></div>
        </div>)
        }
        
    
    </div>
  );
}

export default Header