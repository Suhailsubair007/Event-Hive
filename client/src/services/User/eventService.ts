import axiosInstance from "@/config/axiosInstence";
import { Event } from "../../types/Event-type";

export const fetchEvents = async (): Promise<Event[]> => {
  const response = await axiosInstance.get("/event/events");
  console.log("Events data-->", response.data);

  // ✅ Fix: Convert API response to match `Event` interface
  return response.data.events.map((event: any) => ({
    id: event._id, 
    title: event.title,
    description: event.description,
    eventDate: new Date(event.eventDate),
    startTime: event.startTime,
    endTime: event.endTime,
    tickets: event.tickets,
    tags: event.tags,
    location: event.location,
    posterImageUrl: event.posterImageUrl,
    category: event.category,
    status: event.status.toLowerCase() as "upcoming" | "completed", 
  }));
};


export const createEvent = async (eventData: Event): Promise<Event> => {
  try {
    console.log("Event dataaaaaa------", eventData);
    const response = await axiosInstance.post("/event/add", eventData);
    return response.data.event;
  } catch (error) {
    console.error("Error creating event:", error);
    throw error;
  }
};