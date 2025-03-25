import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { useRazorpay } from "react-razorpay";
import { toast } from "sonner";
import { bookEvent, BookingRequest, BookingResponse } from '../../services/User/bookingService';
import { generateAndUploadQR } from "../../utils/getQrCode";

// Define the Event type based on your usage
interface EventData {
  id: string;
  title: string;
  date: string;
  time: string;
}

// Define the Ticket type matching TicketModal
interface TicketType {
  type: string;
  price: number;
  quantity: number;
  seatInfo: string;
}

// Props interface for RazorpayX
interface RazorpayXProps {
  event: EventData;
  tickets: TicketType[];
  userId: string;
  setStep: (step: "selection" | "payment" | "confirmation") => void;
  setBookingId: (bookingId: string) => void;
  setTransactionId: (transactionId: string) => void;
  onClose: () => void;
}

const RazorpayX: React.FC<RazorpayXProps> = ({
  event,
  tickets,
  userId,
  setStep,
  setBookingId,
  setTransactionId,
  onClose
}) => {
  const { Razorpay } = useRazorpay();
  const [isLoading, setIsLoading] = useState(false);

  const getTotalAmount = () => {
    return tickets.reduce((total, ticket) => {
      const ticketTotal = ticket.price * ticket.quantity;
      const convenienceFee = ticket.type === "normal" ? 5 : 15;
      return total + ticketTotal + convenienceFee * ticket.quantity;
    }, 0);
  };

  const getTicketsForBooking = () => {
    return tickets
      .filter(ticket => ticket.quantity > 0)
      .map(ticket => ({
        type: ticket.type,
        quantity: ticket.quantity,
        price: ticket.price
      }));
  };

  const handlePayment = async () => {
    setIsLoading(true);

    try {
      // Define options without order_id and assert type to bypass strict checking
      const options = {
        key: import.meta.env.VITE_RAZORPAY_API_KEY as string,
        amount: getTotalAmount() * 100, // Convert to paise
        currency: "INR",
        name: event.title,
        description: `Ticket purchase for ${event.title}`,
        handler: async (response: { razorpay_payment_id: string; razorpay_order_id?: string; razorpay_signature?: string }) => {
          try {
            if (response.razorpay_payment_id) {
              // Generate QR code value
              const qrValue = JSON.stringify({
                eventId: event.id,
                eventTitle: event.title,
                userId: userId,
                tickets: getTicketsForBooking(),
                date: event.date,
                time: event.time
              });

              // Generate and upload QR code
              const qrCodeUrl = await generateAndUploadQR(qrValue);
              console.log(qrCodeUrl, "======================")
              
              if (!qrCodeUrl) {
                throw new Error("Failed to generate QR code");
              }

              // Create booking
              const bookingData: BookingRequest = {
                userId: userId,
                eventId: event.id,
                tickets: getTicketsForBooking(),
                qrCode: qrCodeUrl,
                totalAmount: getTotalAmount(),
                paymentMethod: "razorpay"
              };

              const booking: BookingResponse = await bookEvent(bookingData);

              // Set booking details
              setBookingId(booking.bookingId);
              setTransactionId(response.razorpay_payment_id);
              
              // Move to confirmation step
              setStep("confirmation");
            }
          } catch (err) {
            console.error("Payment successful but booking failed:", err);
            toast.error("Payment successful, but booking failed.");
          }
        },
        prefill: {
          name: "", // Pass actual user data if available
          email: "",
          contact: "7736417357",
        },
        theme: {
          color: "#F37254",
        },
        modal: {
          ondismiss: async () => {
            toast.error("Payment cancelled");
            setIsLoading(false);
          }
        }
      } as const; // Type assertion to bypass strict type checking

      const razorpayInstance = new Razorpay(options as any); // Use 'any' to suppress the error
      razorpayInstance.open();
    } catch (error) {
      toast.error("Failed to initialize payment");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Button
        className="w-full max-w-xs bg-purple-600 hover:bg-purple-700"
        onClick={handlePayment}
        disabled={isLoading || !tickets.some(ticket => ticket.quantity > 0)}
      >
        {isLoading ? "Processing..." : "Pay Now"}
      </Button>
    </div>
  );
};

export default RazorpayX;