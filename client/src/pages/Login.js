import React, { useState } from 'react'
import "./signup.css"
import SignUp from './SignUp'
import { Link, useNavigate } from "react-router-dom"
import Google from '../components/Google'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import Loader from '../components/Loader'
function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  const handleLogIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post("http://localhost:5000/api/v1/users/login", { email, password })
      //  console.log(result)
      if (data.status === "success") {
        setTimeout(() => { toast.success("successfully logged in", { position: "top-center", autoClose: 2000, hideProgressBar: true }) }, 1)
        localStorage.setItem("email", email)
        localStorage.setItem("authtoken", true)
        // setLoading(false);
        navigate("/");
      }


    }
    catch (err) {
      // setLoading(false)
      console.log(err);
      toast.error(err.response.data.message, { position: "top-center", hideProgressBar: true, autoClose: true })
    }
    finally {
      setLoading(false);
    }

  }
  return (
    <div className='container'>
      {/* <ToastContainer /> */}
      {/* <h3>Connect with us!!</h3> */}

      <div className='subcontainer'>
        <h1>Connect with us !!</h1>

        <div><div>Email</div><input type="text" onChange={(e) => setEmail(e.target.value)} id="email" /></div>
        <div><div>Password</div><input type="password" id="password" onChange={(e) => setPassword(e.target.value)} /></div>
        <div><button type="Submit" className='submit' onClick={handleLogIn}>{loading ? <Loader /> : <span>Login</span>}</button></div>
        <div style={{ display: "flex", justifyContent: "space-between", margin: "10px 0" }}>
          <div>New User? <Link to="/signup" element={SignUp} style={{ "textDecoration": "none" }}>Register</Link></div><div><Link style={{color:"blue"}} to="/forgotpassword">Forgot password</Link></div></div>
        <Google style={{ textAlign: "center" }} />

      </div>

    </div>
  )
}

export default Login