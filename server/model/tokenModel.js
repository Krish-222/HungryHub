const mongoose = require('mongoose');
require("dotenv").config();

mongoose.connect(process.env.MONGODB_URI)
.then(()=>console.log("token db connected"))
.catch(()=>console.log("some error found ",err));


const tokenSchema = mongoose.Schema({
    userId:{
        type: String,
        required: true,
        unique: true,
        
    },
    token:{
        type:String,
        // default:[],
        required:true,
    },
    createdAt:{
        type: String,
        default:new Date().toString(),
        required:true,
    }
})



module.exports = mongoose.model("tokenModel",tokenSchema); 