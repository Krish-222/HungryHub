const app = require("express")();
const userModel = require('../model/userModel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const cookieParser=require('cookie-parser');
// const bodyParser = require("body-parser");

// app.use(cookieParser)
const crypto = require('crypto');
const sendEmail = require("../middleware/sendEmail");
const tokenModel = require('../model/tokenModel');



const createUser = async (req, res) => {
    try {
        // console.log(req.body)
        let user = await userModel.findOne({ email: req.body.email });
        // console.log(user)

        console.log("passed")
        if (!user) {
            const salt = await bcrypt.genSalt();
            console.log(salt)
            const hashed = await bcrypt.hash(req.body.password, salt)
            console.log(hashed);
            let user = new userModel({ name: req.body.name, email: req.body.email, password: hashed, confirmPassword: hashed })
            console.log(user);
            await user.save();

            // await user.save();
            // console.log(user)

            const payload = { user_id: user._id };
            const secret_key = "food-mern-app";
            const algorithm = { algorithm: "HS256" };
            console.log(secret_key)
            const token = jwt.sign(payload, secret_key, algorithm)


            res.cookie("isLoggedIn", token, { maxAge: 1000 * 60 * 60 * 24 });
            res.status(200).send({status:"success",user});
        }
        else {
            res.status(400).send({message:"email already in use"});
        }

    }
    catch (err) {
        console.log(err)
        res.status(500).send({message:"internal error"});
    }
}


const checkUser = async (req, res) => {
    try {
        const user = await userModel.findOne({ email: req.body.email });

        if (user) {
            const isVerified = await bcrypt.compare(req.body.password, user.password)

            if (isVerified) {

                const payload = { user_id: user._id };
                const secret_key = "food-mern-app";
                const algorithm = { algorithm: "HS256" }
                const token = jwt.sign(payload, secret_key, algorithm);

                res.cookie("isLoggedIn", token, { maxAge: 1000 * 60 * 600 * 24, httpOnly: true });

                res.status(200).json({ status: "success", user: user });



            }
            else {
                res.status(400).json({ status: "fails", message: "Invalid Password" })
            }
        }

        else {
            res.status(400).json({ status: "failure", message: "Not Found , sign up first" })
        }
    }

    catch (err) {
        res.status(500).send("internal server error")
    }


}
const logOut = (req, res) => {
    try {
        res.clearCookie("isLoggedIn");
        res.status(200).send({ status: "success", message: "logout successfull" })
    }
    catch (err) {
        res.status(500).send({ status: "fails", message: "found some errors,please try after sometime" })
    }
}

const resetPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await userModel.findOne({ email: email });
        if (user) {
            let token = await tokenModel.findOne({ userId: user._id });
            if (token) { await token.deleteOne(); }
            const randomBytes = crypto.randomBytes(32).toString("hex");
            const salt = await bcrypt.genSalt();
            const bcryptToken = await bcrypt.hash(randomBytes, salt);
            token = await (new tokenModel({ userId: user._id, token: bcryptToken })).save();
            sendEmail(token.token, email, token.userId);
            res.status(200).json({ status: 'success', msg: "reset password email sent successfully to your mailbox", token });

        }
        else {
            res.status(404).json({ status: "fail", msg: "Not registered" });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ status: "fail", msg: "internal error" });
    }
}
const checkingTokenAndReseting = async (req, res) => {
    try {
        let { token, userId } = req.body;
        token = await tokenModel.findOne({ token: token });
        if (token) {
            const salt = await bcrypt.genSalt()
            let { password } = req.body;
            password = await bcrypt.hash(password, salt);
            const user = await userModel.findByIdAndUpdate({ _id: userId }, { $set: { password: password } });
            token = await tokenModel.findOne({ token: token.token });
            await token.deleteOne()
            res.status(200).send({ status: "success", msg: "password changed successfully", data: { user } });

        }
        else {
            res.status(404).json({ status: "fail", msg: "reset token has been expired or does not exist" });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ status: "fail", msg: "internal error" });
    }
}



module.exports = { createUser, checkUser, logOut, checkingTokenAndReseting, resetPassword }