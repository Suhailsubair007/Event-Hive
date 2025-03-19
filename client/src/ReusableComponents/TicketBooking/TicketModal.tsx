import { useState } from "react";
import { Calendar, Clock, MapPin, Minus, Plus, Printer, X } from "lucide-react";
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { EventData } from "../../services/User/eventService"; // Adjust path as needed

interface TicketModalProps {
  event: EventData;
  onClose: () => void;
}

interface TicketType {
  type: string;
  price: number;
  quantity: number;
  seatInfo: string;
}

export const TicketModal: React.FC<TicketModalProps> = ({ event, onClose }) => {
  const [step, setStep] = useState<"selection" | "payment" | "confirmation">("selection");
  const [tickets, setTickets] = useState<TicketType[]>([
    { type: "Regular", price: parseFloat(event.price) || 80, quantity: 0, seatInfo: "R 20" },
    { type: "VIP", price: parseFloat(event.price) * 1.5 || 120, quantity: 0, seatInfo: "H 13, H 16" },
  ]);

  const handleQuantityChange = (index: number, change: number) => {
    const newTickets = [...tickets];
    const newQuantity = Math.max(0, newTickets[index].quantity + change);
    newTickets[index].quantity = newQuantity;
    setTickets(newTickets);
  };

  const getTotalAmount = () => {
    return tickets.reduce((total, ticket) => {
      const ticketTotal = ticket.price * ticket.quantity;
      const convenienceFee = ticket.type === "Regular" ? 5 : 15;
      return total + ticketTotal + convenienceFee * ticket.quantity;
    }, 0);
  };

  const getSubtotal = (ticket: TicketType) => {
    const convenienceFee = ticket.type === "Regular" ? 5 : 15;
    return (ticket.price + convenienceFee) * ticket.quantity;
  };

  const handleProceed = () => {
    if (step === "selection") setStep("payment");
    else if (step === "payment") setStep("confirmation");
  };

  const resetModal = () => {
    setStep("selection");
    setTickets(tickets.map((ticket) => ({ ...ticket, quantity: 0 })));
    onClose(); // Call the onClose prop when closing
  };

  const hasSelectedTickets = tickets.some((ticket) => ticket.quantity > 0);

  return (
    <Dialog open={true} onOpenChange={(isOpen) => !isOpen && resetModal()}>
      <DialogContent className="sm:max-w-md md:max-w-lg">
        <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogClose>

        <div className="flex justify-between border-b pb-4">
          <div className={cn("px-4 py-2 font-medium", step === "selection" ? "text-purple-600 border-b-2 border-purple-600" : "text-gray-500")}>
            Ticket Selection
          </div>
          <div className={cn("px-4 py-2 font-medium", step === "payment" ? "text-purple-600 border-b-2 border-purple-600" : "text-gray-500")}>
            Payment
          </div>
          <div className={cn("px-4 py-2 font-medium", step === "confirmation" ? "text-purple-600 border-b-2 border-purple-600" : "text-gray-500")}>
            Confirmation
          </div>
        </div>

        {step === "selection" && (
          <div className="space-y-6 py-4">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">{event.title}</h2>

                <div className="space-y-2">
                  <div className="font-medium">Date</div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    {event.date}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="font-medium">Time</div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    {event.time}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="font-medium">Location</div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    {event.location}
                  </div>
                </div>

                {tickets.map((ticket, index) => (
                  <div key={ticket.type} className="pt-4">
                    <div className="font-medium">{ticket.type}</div>
                    <div className="flex items-center justify-between mt-2">
                      <div>
                        <span className="text-xl font-semibold">₹ {ticket.price}</span>
                        <div className="text-sm text-gray-500">convenience fee + taxes</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 rounded-full"
                          onClick={() => handleQuantityChange(index, -1)}
                          disabled={ticket.quantity === 0}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-6 text-center">{ticket.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 rounded-full"
                          onClick={() => handleQuantityChange(index, 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="md:w-1/2">
                <img
                  src={event.bannerImage || "https://res.cloudinary.com/dupo7yv88/image/upload/v1741252210/gu767rm9tf8ukr19mfsh.jpg"}
                  alt="Event poster"
                  width={300}
                  height={300}
                  className="rounded-lg object-cover w-full aspect-square"
                />
              </div>
            </div>

            <div className="flex justify-center pt-4">
              <Button
                className="w-full max-w-xs bg-purple-600 hover:bg-purple-700"
                onClick={handleProceed}
                disabled={!hasSelectedTickets}
              >
                Proceed
              </Button>
            </div>
          </div>
        )}

        {step === "payment" && (
          <div className="space-y-6 py-4">
            <h2 className="text-2xl font-bold uppercase">Booking Summary</h2>

            <div className="space-y-1">
              <div className="font-semibold">{event.title}</div>
              <div className="text-sm text-gray-600">{event.location}</div>
            </div>

            <div className="space-y-2 border-t border-b py-4">
              <h3 className="font-medium">Instructions:</h3>
              <ul className="space-y-1">
                <li className="flex items-center gap-2 text-sm">
                  <span className="text-green-500">✓</span> Entry for 1 person
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <span className="text-green-500">✓</span> No Re-Entry will be allowed (single entry only)
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <span className="text-green-500">✓</span> Access only on {event.date}
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <span className="text-green-500">✓</span> No Cancellation after payment
                </li>
              </ul>
            </div>

            {tickets.map(
              (ticket) =>
                ticket.quantity > 0 && (
                  <div key={ticket.type} className="space-y-1">
                    <div className="flex justify-between">
                      <div className="font-medium">
                        {ticket.type} ({ticket.seatInfo}):
                      </div>
                      <div>
                        {ticket.quantity} {ticket.quantity === 1 ? "Ticket" : "Tickets"}
                      </div>
                    </div>
                    <div className="flex justify-between text-sm">
                      <div className="text-gray-600">
                        Sub Total: {ticket.quantity} x ₹{ticket.price} + convenience fee (₹
                        {ticket.type === "Regular" ? "5" : "15"}) + taxes
                      </div>
                      <div className="font-semibold">₹{getSubtotal(ticket)}</div>
                    </div>
                  </div>
                ),
            )}

            <div className="flex justify-between border-t pt-4">
              <div className="font-semibold">Amount Payable</div>
              <div className="font-bold text-lg">₹{getTotalAmount()}</div>
            </div>

            <div className="flex justify-center pt-4">
              <Button className="w-full max-w-xs bg-purple-600 hover:bg-purple-700" onClick={handleProceed}>
                Proceed
              </Button>
            </div>
          </div>
        )}

        {step === "confirmation" && (
          <div className="space-y-6 py-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="md:w-1/3">
                  <img
                    src={event.bannerImage || "https://res.cloudinary.com/dupo7yv88/image/upload/v1741252210/gu767rm9tf8ukr19mfsh.jpg"}
                    alt="Event thumbnail"
                    width={200}
                    height={200}
                    className="rounded-lg object-cover w-full aspect-square"
                  />
                </div>

                <div className="md:w-2/3 space-y-3">
                  <h3 className="font-semibold">{event.title}</h3>
                  <div className="text-sm">{event.location}</div>

                  <div className="space-y-1">
                    <div className="text-sm font-medium">Date</div>
                    <div className="text-sm">{event.date}</div>
                  </div>

                  <div className="space-y-1">
                    <div className="text-sm font-medium">Time</div>
                    <div className="text-sm">{event.time}</div>
                  </div>

                  <div className="space-y-1">
                    {tickets.map(
                      (ticket) =>
                        ticket.quantity > 0 && (
                          <div key={ticket.type} className="text-sm">
                            {ticket.type} : {ticket.quantity} {ticket.quantity === 1 ? "Ticket" : "Tickets"}
                          </div>
                        ),
                    )}
                  </div>
                </div>

                <div className="md:w-1/4 flex justify-center items-start">
                  <div className="text-center">
                    <img
                      src="/placeholder.svg?height=100&width=100"
                      alt="QR Code"
                      width={100}
                      height={100}
                      className="mx-auto"
                    />
                    <div className="text-xs mt-1">BOOKING ID</div>
                    <div className="text-xs font-semibold">WQFQGAX</div> {/* You might want to generate this dynamically */}
                  </div>
                </div>
              </div>
            </div>

            <Button variant="outline" className="w-full flex items-center justify-center gap-2">
              <Printer className="h-4 w-4" />
              Print Ticket
            </Button>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div>
                <div className="text-sm text-gray-500">Booking Date</div>
                <div className="font-medium">{new Date().toLocaleDateString()}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Payment Method</div>
                <div className="font-medium">UPI</div> {/* This could be dynamic */}
              </div>
              <div>
                <div className="text-sm text-gray-500">Transaction ID</div>
                <div className="font-medium">45HY789DS</div> {/* This should be dynamic */}
              </div>
            </div>

            <div className="flex justify-center pt-4">
              <Button className="w-full max-w-xs bg-purple-600 hover:bg-purple-700">View in Bookings</Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};