import { useState } from "react";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  PlusIcon,
  WalletIcon,
  XIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSelector } from "react-redux";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { addAmountToWallet, getWalletDetails } from "../../services/User/walletService";

export default function WalletComponent() {
  const [isAddFundsOpen, setIsAddFundsOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const userId = useSelector((state: any) => state?.user?.userInfo?.id);
  const queryClient = useQueryClient();

  const { data: wallet, isLoading, error } = useQuery({
    queryKey: ['wallet', userId],
    queryFn: () => getWalletDetails(userId),
    enabled: !!userId, 
  });

  const addFundsMutation = useMutation({
    mutationFn: addAmountToWallet,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wallet', userId] });
      setAmount("");
      setIsAddFundsOpen(false);
    },
    onError: (error) => {
      console.error('Error adding funds:', error);
    },
  });

  const handleAddFunds = () => {
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) return;

    addFundsMutation.mutate({
      userId,
      amount: Number(amount),
    });
  };

  if (isLoading) {
    return <div>Loading wallet details...</div>;
  }

  if (error) {
    return <div>Error loading wallet: {(error as Error).message}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Your Wallet</h1>
          <p className="text-gray-500">Manage your wallet</p>
        </div>
        <div className="text-right">
          <p className="text-gray-500">Welcome!</p>
          <p className="font-semibold">Suhail Subair</p>
        </div>
      </div>

      <Card className="mb-6 border-none shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-lg font-medium">
            <WalletIcon className="h-5 w-5 text-[#7848F4]" />
            My Wallet
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg">
            <div>
              <p className="text-sm text-gray-500 mb-1">Wallet Balance</p>
              <p className="text-3xl font-bold">
                {wallet?.balance.toLocaleString() || '0'}
              </p>
            </div>
            <Button
              onClick={() => setIsAddFundsOpen(true)}
              className="bg-[#7848F4] hover:bg-[#6a3fd8] text-white"
              disabled={addFundsMutation.isPending}
            >
              <PlusIcon className="h-4 w-4 mr-2" />
              {addFundsMutation.isPending ? 'Adding...' : 'Add Funds'}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-none shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">
            Recent Transactions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[350px] rounded-md">
            <Table>
              <TableHeader className="bg-gray-50 sticky top-0">
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {wallet?.transactions?.map((transaction, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div
                          className={`p-1.5 rounded-full ${
                            transaction.transaction_type === "credit"
                              ? "bg-green-100"
                              : "bg-red-100"
                          }`}
                        >
                          {transaction.transaction_type === "credit" ? (
                            <ArrowUpIcon className="h-4 w-4 text-green-500" />
                          ) : (
                            <ArrowDownIcon className="h-4 w-4 text-red-500" />
                          )}
                        </div>
                        {transaction.transaction_type}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">
                      ₹{transaction.amount.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      {new Date(transaction.transaction_date).toLocaleString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          transaction.transaction_type === "credit"
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {transaction.transaction_status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
                {(!wallet?.transactions || wallet.transactions.length === 0) && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center">
                      No transactions found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Add Funds Modal */}
      <Dialog open={isAddFundsOpen} onOpenChange={setIsAddFundsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle className="text-xl font-bold">Add Funds</DialogTitle>
              <DialogClose className="h-6 w-6 rounded-full hover:bg-gray-100">
                <XIcon className="h-4 w-4" />
              </DialogClose>
            </div>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <p className="text-gray-600">
              Enter the amount to add to your wallet.
            </p>
            <div className="space-y-2">
              <Input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="focus-visible:ring-[#7848F4]"
                disabled={addFundsMutation.isPending}
              />
            </div>
            <Button
              onClick={handleAddFunds}
              className="w-full bg-[#7848F4] hover:bg-[#6a3fd8] text-white"
              disabled={addFundsMutation.isPending}
            >
              {addFundsMutation.isPending ? 'Adding...' : 'Add Funds'}
            </Button>
            {addFundsMutation.isError && (
              <p className="text-red-500 text-sm">
                Error adding funds. Please try again.
              </p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}