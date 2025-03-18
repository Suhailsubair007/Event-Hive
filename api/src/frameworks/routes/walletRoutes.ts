import express from "express";
import {
  addAmountToWalletController,
  getUserWalletController,
} from "../di/User/Wallet.dependency.Container";

const walletRoute = express.Router();

walletRoute.get("/wallet", (req, res) =>
  getUserWalletController.getUserWallet(req, res)
);
walletRoute.post("/add", (req, res) =>
  addAmountToWalletController.addAmountToWallet(req, res)
);

export default walletRoute;
