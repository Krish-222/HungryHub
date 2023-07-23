
const mongoose = require('mongoose');
require("dotenv").config();

mongoose.connect(process.env.MONGODB_URI)
.then(()=>console.log("orders db connected"))
.catch(()=>console.log("some error found ",err));


const orderSchema= mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    orders:{
        type:Array,
        default:[],
        required:true,
    }
})



module.exports = mongoose.model("orderModel",orderSchema);