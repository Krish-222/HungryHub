import React from 'react'
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { toast } from "react-toastify"
import { useNavigate ,useLocation} from 'react-router-dom';
// import { useLocation } from 'react-router-dom';

import jwt_decode from "jwt-decode";

function Google() {
  const navigate = useNavigate();
  const location = useLocation();
  const responseMessage = async (response) => {

    console.log(response)
    const details = jwt_decode(response.credential);

    // const id=jwt_decode(response.clientId)
    // console.log(id)
    console.log(details);
    if (location.pathname=== "/login") {

      try {
        const {data} = await axios.post("/login", { email: details.email, password: details.given_name });
        // console.log(result)
        if (data.status === 'success') {
          setTimeout(() => { toast.success("successfully logged in", { position: "top-center", autoClose: 2000, hideProgressBar: true }) }, 1)
          localStorage.setItem("authtoken", true)
          navigate("/");
        }
      }
      catch (err) {
        console.log(err);
        toast.error(err.response.data.message, { position: "top-center", hideProgressBar: true, autoClose: true })//displaying error message 
      }
    }
    else {
      try {
        const result = await axios.post("/signup", { name: details.given_name, email: details.email, password: details.given_name, confirmPassword: details.given_name });
        if (result.status === 200) {
          navigate("/");
          setTimeout(() => { toast.success("successfully signed up", { position: "top-center", autoClose: 2000 }) }, 1)
        }
      }
      catch (err) {
        console.log(err);
        toast.error(err.response.data, { position: "top-center", hideProgressBar: true, autoClose: true })
      }


    }

  };
  const errorMessage = (error) => {
    console.log(error);
  };
  return (
    <div>
      <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
    </div>
  )
}

export default Google