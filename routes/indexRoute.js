//requires delas rutas:
const userRouter = require("./userRoute");
const transactionRoute = require("./transactionRoute");
const walletRoute = require("./walletRoute");
const coinsRoute = require("./coinsRoute");
const rolController = require("../controllers/rol.controller");

//express:
const express = require("express");
const indexRouter = express.Router();

//Prueba
indexRouter.get("/", (req, res) => {
  res.json({ mensaje: "Home" });
});
indexRouter.post("/rol", rolController.createRol);

//Uso de las rutas:
indexRouter.use("/user", userRouter);
indexRouter.use("/transaction", transactionRoute);
indexRouter.use("/wallet", walletRoute);
indexRouter.use("/coins", coinsRoute);

module.exports = indexRouter;
