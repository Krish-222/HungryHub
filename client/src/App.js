import React from "react";
// import './App.css';
import Home from "./pages/Home.js";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { CartProvider } from "./components/CartProvider";
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Practice from "./components/Practice";
import Cart from "./pages/Cart";
import { ToastContainer } from "react-toastify";
import MyOrder from "./pages/MyOrder";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
// import clientID from "../Client_Id";

function App() {
  return (
    <>
      <ToastContainer/>
      <GoogleOAuthProvider clientId="1044607482658-dnjfu0ioqabi15c92b1tf2qukblkbjh9.apps.googleusercontent.com">
      <CartProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/signup" element={<SignUp />}></Route>
              <Route path='/login' element={<Login />}></Route>
              <Route path="/practice" element={<Practice />}></Route>
              <Route path="/cart" element={<Cart />}></Route>
              <Route path="/myorders" element={<MyOrder />}></Route>
              <Route path="/forgotpassword" element={<ForgotPassword/>}></Route>
              <Route path="/reset" element={<ResetPassword/>}></Route>
            </Routes>
          </Router>
        </CartProvider>
      </GoogleOAuthProvider>
    </>
  );
}

export default App;
