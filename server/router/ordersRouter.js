const app = require("express")();
const {getAllOrderData,storeData} = require("../controllers/orders")

const ordersRouter = require("express").Router();


ordersRouter.route("/allorders").post(getAllOrderData);
ordersRouter.route("/createorder").post(storeData);



module.exports = ordersRouter;
