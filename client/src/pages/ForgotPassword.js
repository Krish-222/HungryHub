import React, { useState } from 'react'
import axios from 'axios'
import {toast} from "react-toastify"
import { useNavigate } from 'react-router-dom'

function ForgotPassword() {

    const [email,setEmail]=useState("")
    const navigate=useNavigate();
    const handleSubmit=async()=>{
        try{
        const {data}=await axios.post("http://localhost:5000/api/v1/users/resetpassword",{email});
        toast.success("password change link send to your mailbox")
        console.log(data)
        }
        catch(err){
            setTimeout(()=>toast.error("Not Registered"),1);
            navigate("/signup");

        }

    }
  return (
    <div style={{
        height:"100vh",
        display:"flex",
        placeItems:"center",
        justifyContent:"center",
        boxShadow:" 0 2px 5px rgba(0, 0, 0, 0.1)",
    }}>
        <div style={
            {
                width:'50%',
                display:"flex",
                flexDirection:"column",
                gap:"20px",
                padding:"5%"

            }
        }>
            <div>Enter you email</div>
            <div><input type="text"  placeholder='enter email' style={{
                height:"40px"
            }}  onChange={(e)=>setEmail(e.target.value)}></input></div>
            <div>
                <button onClick={handleSubmit}>Submit</button>
            </div>
            
        </div>
    </div>
  )
}

export default ForgotPassword