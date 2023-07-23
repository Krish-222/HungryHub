const app = require("express")();
const { getFoodData,getFoodCategory } = require("../controllers/food");

const foodRouter = require("express").Router();

foodRouter.route("/fooddata").get(getFoodData);
foodRouter.route("/foodcategory").get(getFoodCategory);

module.exports = foodRouter;
