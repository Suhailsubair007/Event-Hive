import Header from "@/ReusableComponents/LandingReusableComponents/Header"
import Footer from "@/ReusableComponents/LandingReusableComponents/Footer"
import EventsNearYou from "@/ReusableComponents/LandingReusableComponents/EventsNearYou"
import Hero from "@/ReusableComponents/LandingReusableComponents/Hero"
import InterestBasedEvents from "@/ReusableComponents/LandingReusableComponents/InterestBasedEvents"

const Landing = () => {
  return (
    
    <div className="min-h-screen">
    <Header />
    <main className="pt-10">
      <Hero />
      <EventsNearYou />
      <InterestBasedEvents />
    </main>
    <Footer />
  </div>
  )
}

export default Landing
