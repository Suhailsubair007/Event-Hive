import EventDetails from "@/ReusableComponents/MainEventComponents/MainEventComponets";
import Header from "@/ReusableComponents/LandingReusableComponents/Header";

const MainEventPage = () => {
  return (
    <div>
      <Header />
      <div className="pt-16">
        <EventDetails />
      </div>
    </div>
  );
};

export default MainEventPage;
