import { motion } from "framer-motion"
import { Heart, Share2 } from "lucide-react"

interface InterestEvent {
  id: number
  title: string
  image: string
  category: string
  date: string
  likes: number
}

const events: InterestEvent[] = [
  {
    id: 1,
    title: "Let you go Insane",
    image: "https://res.cloudinary.com/dwzmsvp7f/image/upload/f_auto,w_400/c_crop%2Cg_custom%2Fv1737836445%2Fskykgy7caaehvw3pw8ti.jpg",
    category: "Music",
    date: "Mar 25, 2024",
    likes: 1200,
  },
  {
    id: 2,
    title: "Save Earth",
    image: "https://res.cloudinary.com/dwzmsvp7f/image/upload/f_auto,w_400/c_crop%2Cg_custom%2Fv1738864205%2Fedu35uglfzuojcys2otb.jpg",
    category: "Environment",
    date: "Apr 1, 2024",
    likes: 850,
  },
  // Add more events
]

const InterestBasedEvents = () => {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-8">Based on your interests</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-md overflow-hidden group"
            >
              <div className="relative">
                <img
                  src={event.image || "/placeholder.svg"}
                  alt={event.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 flex space-x-2">
                  <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100">
                    <Heart className="h-4 w-4 text-[#7848F4]" />
                  </button>
                  <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100">
                    <Share2 className="h-4 w-4 text-[#7848F4]" />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <div className="text-sm text-[#7848F4] font-medium mb-2">{event.category}</div>
                <h3 className="text-lg font-semibold mb-2">{event.title}</h3>
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <span>{event.date}</span>
                  <span>{event.likes} likes</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default InterestBasedEvents

