
const mongoose = require('mongoose');
require("dotenv").config();

mongoose.connect(process.env.MONGODB_URI)
.then(()=>console.log("food db connected"))
.catch(()=>console.log("some error found ",err));


const foodSchema= mongoose.Schema({
    CategoryName:String,
    name:String,
    img:String,
    options:Array,
    description:String
})

const foodCategorySchema= mongoose.Schema({
    CategoryName:String,
});



module.exports = {foodModel:mongoose.model("foodModel",foodSchema),foodCategoryModel:mongoose.model("foodCategoryModel",foodCategorySchema)}
