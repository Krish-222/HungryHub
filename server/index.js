const express = require("express");
const app = new express();
require("dotenv").config();
const userRouter = require("./router/userRouter");
const orderRouter= require("./router/ordersRouter");
const foodRouter = require("./router/foodRouter");
const bodyParser = require("body-parser");
const fs= require("fs");
const cors=require("cors");

const port =process.env.PORT || 8080

//middleware

app.use(express.json());
app.use(cors());

//router
app.use("/api/v1/users", userRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/food",foodRouter)



//app backend on port 5000
app.listen(port, "localhost", () => {
    console.log("connected on port", port)

})



