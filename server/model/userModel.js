const app = require('express')();
const mongoose = require('mongoose');
require("dotenv").config();

const emailValidator = require('email-validator');
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI)
    .then((db) => { console.log("mongodb connected") })
    .catch((error) => { console.log(error) });

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 3,
        trim: true,

    },
    email: {
        type: String,
        required: true,
        unique: true,
        // validate: () => emailValidator.validate(this.email)


    },
    password: {
        type: String,
        required: true,


    },
    confirmPassword: {
        type: String,
        required: true,
        validate: () => this.confirmPassword === this.password
    }
})

userSchema.pre("save", () => {
    userSchema.confirmPassword = undefined;
})

module.exports = mongoose.model("userModel", userSchema);