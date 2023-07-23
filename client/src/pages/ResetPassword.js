import React, { useState } from 'react'
import axios from 'axios'
import { toast } from "react-toastify" 
import {useNavigate} from "react-router-dom"

function ForgotPassword() {
const navigate=useNavigate()


    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    
    let params = new URL(document.location).searchParams;
    let token = params.get("token"); // is the string "Jonathan Smith".
    let userId =params.get("userid"); // is the number 18
    console.log(token,userId)
    const handleSubmit = async () => {
        try{
      

        if (password != confirmPassword) {
            toast.error("password and confirm password should be same");
            return ;

        }
        if(password.length <5){
            toast.error("password must be greater then 5"); 
            return;
        }

        const { data } = await axios.post("http://localhost:5000/api/v1/users/checkresetoken", { token, userId ,password});
        if(data.status==="success"){
            setTimeout(()=>toast.success("pasword updated successfully"),1)
            navigate("/login");

        }}
        catch(err){
            console.log(err)
            toast.error(err.response.data.msg)
        }

    }
    return (
        <div style={{
            height: "100vh",
            display: "flex",
            placeItems: "center",
            justifyContent: "center",
            boxShadow: " 0 2px 5px rgba(0, 0, 0, 0.1)",
        }}>
            <div style={
                {
                    width: '50%',
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                    padding: "5%"

                }
            }>
                <div>Enter New Password</div>
                <div><input type="text" placeholder='enter email' style={{
                    height: "40px"
                }} onChange={(e) => setPassword(e.target.value)}></input></div>
                <div>Confirm Password</div>
                <div><input type="text" onChange={(e) => setConfirmPassword(e.target.value)} style={{
                    height: "40px"
                }}></input></div>
                <div>
                    <button onClick={handleSubmit}>Submit</button>
                </div>

            </div>
        </div>
    )
}

export default ForgotPassword