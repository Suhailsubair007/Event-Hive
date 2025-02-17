import { motion } from "framer-motion"
import { Calendar, MapPin, Clock } from "lucide-react"

interface Event {
  id: number
  title: string
  image: string
  date: string
  location: string
  time: string
}

const events: Event[] = [
  {
    id: 1,
    title: "TechFest 2024",
    image: "https://res.cloudinary.com/dwzmsvp7f/image/upload/f_auto,w_400/c_crop%2Cg_custom%2Fv1738864205%2Fedu35uglfzuojcys2otb.jpg",
    date: "Mar 15, 2024",
    location: "Kochi",
    time: "10:00 AM",
  },
  {
    id: 2,
    title: "Music Festival",
    image: "https://res.cloudinary.com/dwzmsvp7f/image/upload/f_auto,w_400/c_crop%2Cg_custom%2Fv1737836445%2Fskykgy7caaehvw3pw8ti.jpg",
    date: "Mar 20, 2024",
    location: "Trivandrum",
    time: "6:00 PM",
  },
  // Add more events as needed
]

const EventsNearYou = () => {
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
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="relative h-48">
                <img src={event.image || "/placeholder.svg"} alt={event.title} className="w-full h-full object-cover" />
                <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-medium">
                  Featured
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
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>{event.time}</span>
                  </div>
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

