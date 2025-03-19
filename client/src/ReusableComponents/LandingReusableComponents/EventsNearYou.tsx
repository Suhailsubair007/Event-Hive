import { motion } from "framer-motion";
import { Calendar, MapPin} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getEvents } from "../../services/User/eventService";
import { useNavigate } from "react-router-dom";

interface Ticket {
  type: string
  price: number
  availableSeats: number
  sold: number
  _id: string
}

interface Event {
  id: string
  title: string
  description: string
  image: string
  date: string
  startTime: string
  endTime: string
  location: string
  status: string
  tickets: Ticket[]
  tags: string[]
}

const EventsNearYou = () => {
  const { 
    data: events, 
    isLoading, 
    error 
  } = useQuery({
    queryKey: ['events'],
    queryFn: getEvents,
  })

  const navigate = useNavigate();

  if (isLoading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">Loading events...</div>
        </div>
      </section>
    )
  }

  const handleCardClick = (eventId: string) => {
    navigate(`/event/${eventId}`);
  };

  if (error) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-red-500">
            Error loading events: {error.message}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Events around you</h2>
          <div className="flex items-center space-x-4">
            <select className="p-2 border rounded-lg">
              <option>This week</option>
              <option>This month</option>
              <option>Next month</option>
            </select>
            <select className="p-2 border rounded-lg">
              <option>Sort by date</option>
              <option>Sort by popularity</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events?.map((event: Event, index: number) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              onClick={() => handleCardClick(event.id)}
            >
              <div className="relative h-48">
                <img 
                  src={event.image || "/placeholder.svg"} 
                  alt={event.title} 
                  className="w-full h-full object-cover" 
                />
                <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-medium">
                  {event.status}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3">{event.title}</h3>
                <div className="space-y-2 text-gray-600">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{event.date}</span>
                  </div>
                 
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span className="line-clamp-1">{event.location}</span>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-700">Tickets from:</p>
                  <p className="text-lg font-bold">
                    ₹{Math.min(...event.tickets.map(t => t.price))}
                  </p>
                </div>
                <button className="mt-4 w-full bg-[#7848F4] text-white py-2 rounded-lg hover:bg-[#6a3ee0] transition-colors">
                  Book Now
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default EventsNearYou