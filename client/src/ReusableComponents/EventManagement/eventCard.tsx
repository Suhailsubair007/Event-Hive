import { Calendar, Clock, MapPin, Edit, Trash2, User } from "lucide-react";
import type { Event } from "../../types/Event-type";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { formatDate } from "../../utils/formatDate";
import { motion } from "framer-motion";
import { useState } from "react";

interface EventCardProps {
  event: Event;
  onEdit: () => void;
  onDelete: () => void;
}

export function EventCard({ event, onEdit, onDelete }: EventCardProps) {
  const { title, eventDate, location, tickets } = event;
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const isFree = tickets.every((ticket) => ticket.price === 0);
  const price = isFree ? "Free" : `$${tickets[0].price}`;

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  const handleConfirmDelete = () => {
    onDelete();
    setIsDialogOpen(false);
  };

  return (
    <motion.div variants={item}>
      <Card className="overflow-hidden h-full transition-all duration-300 hover:shadow-lg">
        <div className="relative">
          <div className="h-48 bg-gray-200 relative">
            <img
              src={
                event.posterImageUrl !== "https://example.com/poster.jpg"
                  ? event.posterImageUrl
                  : `/placeholder.svg?height=200&width=400`
              }
              alt={title}
              className="w-full h-full object-cover"
            />

            <div className="absolute top-2 right-2 flex gap-2">
              <Button
                variant="secondary"
                size="icon"
                className="rounded-full bg-white/80 hover:bg-white"
                onClick={onEdit}
              >
                <Edit className="h-4 w-4 text-gray-700" />
              </Button>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="rounded-full bg-white/80 hover:bg-white"
                  >
                    <Trash2 className="h-4 w-4 text-gray-700" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] bg-white rounded-lg border border-purple-200">
                  <DialogHeader>
                    <DialogTitle className="text-purple-700">
                      Confirm Deletion
                    </DialogTitle>
                    <DialogDescription className="text-gray-600">
                      Are you sure you want to delete the event "{title}"? This
                      action cannot be undone.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter className="mt-4">
                    <Button
                      variant="outline"
                      onClick={() => setIsDialogOpen(false)}
                      className="text-purple-700 border-purple-300 hover:bg-purple-50"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleConfirmDelete}
                      className="bg-purple-600 hover:bg-purple-700 text-white"
                    >
                      Delete
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>

        <CardContent className="p-4">
          <h3 className="font-bold text-lg mb-2">{title}</h3>

          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-gray-500" />
              <span className="text-gray-600">Open</span>
            </div>

            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gray-500" />
              <span className="text-gray-600">{formatDate(eventDate)}</span>
            </div>

            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-gray-500" />
              <span className="text-gray-600 truncate">{location.address}</span>
            </div>

            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-gray-500" />
              <span className="text-gray-600">{price}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}