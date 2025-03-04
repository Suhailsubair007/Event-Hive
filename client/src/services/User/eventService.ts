import axiosInstance from "@/config/axiosInstence";
import { Event } from "../../types/Event-type";

export const fetchEvents = async (): Promise<Event[]> => {
  const response = await axiosInstance.get("/event/events");
  console.log("Events data-->", response.data);


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
    const response = await axiosInstance.post("/event/add", eventData);
    return response.data.event;
  } catch (error) {
    console.error("Error creating event:", error);
    throw error;
  }
};

export const editEvent = async (eventId: string, eventData: Partial<Event>): Promise<Event> => {
  try {
    console.log("Event data in edit event",eventData)
    const response = await axiosInstance.post(`/event/edit/${eventId}`, eventData);
    console.log("Inside the edit event",response.data.event)
    return response.data.event;
  } catch (error) {
    console.error("Error editing event:", error);
    throw error;
  }
};