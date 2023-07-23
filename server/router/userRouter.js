const app=require("express")();
const {createUser,checkUser,logOut,resetPassword,checkingTokenAndReseting} = require("../controllers/user");

const userRouter = require("express").Router();
const bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: true });
app.use(bodyParser.json());


userRouter.route("/signup").post(createUser,urlencodedParser);
userRouter.route("/login").post(checkUser,urlencodedParser);
userRouter.route("/logout").get(logOut);
userRouter.route("/resetpassword").post(resetPassword,urlencodedParser);
userRouter.route("/checkresetoken").post(checkingTokenAndReseting,urlencodedParser);




module.exports = userRouter;