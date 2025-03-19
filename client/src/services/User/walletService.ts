import axiosInstance from "@/config/axiosInstence";

interface Transaction {
  transaction_date: string;
  transaction_type: string;
  transaction_status: string;
  amount: number;
}

interface WalletData {
  _id: string;
  user: string;
  balance: number;
  transactions: Transaction[];
}

interface AddAmountData {
  userId: string;
  amount: number;
}

export const getWalletDetails = async (userId: string): Promise<WalletData> => {
  const response = await axiosInstance.get("/wallet/wallet", {
    params: { userId }
  });
  return response.data.wallet;
};

export const addAmountToWallet = async (data: AddAmountData): Promise<WalletData> => {
  const response = await axiosInstance.post("/wallet/add", data);
  return response.data.wallet;
};