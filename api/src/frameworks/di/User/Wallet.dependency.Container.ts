import { GetUserWalletController } from "../../../interface-apdaters/controllers/users/Wallet/GetUserWalletController";
import { AddAmountToWalletController } from "../../../interface-apdaters/controllers/users/Wallet/AddAmountToWalletController";
import { GetUserWallet } from "../../../use-cases/user/Wallet/GetUserWallet";
import { AddAmountToWallet } from "../../../use-cases/user/Wallet/AddAmountToWallet";
import { WalletRepository } from "../../../interface-apdaters/repositories/User/WalletRepository";



const walletRepository = new WalletRepository();

const getUserWallet = new GetUserWallet(walletRepository);
const addAmountToWallet = new AddAmountToWallet(walletRepository);

const getUserWalletController = new GetUserWalletController(getUserWallet);
const addAmountToWalletController = new AddAmountToWalletController(addAmountToWallet);


export {
    getUserWalletController,
    addAmountToWalletController
}