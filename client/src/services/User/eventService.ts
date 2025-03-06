import axiosInstance from "@/config/axiosInstence";
import { Event } from "../../types/Event-type";

export const fetchEvents = async (clientId?: string): Promise<Event[]> => {
  const response = await axiosInstance.get("/event/events", {
    params: { clientId }, // Pass clientId as a query parameter
  });

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

export const editEvent = async (
  eventId: string,
  eventData: Partial<Event>
): Promise<Event> => {
  try {
    const response = await axiosInstance.post(
      `/event/edit/${eventId}`,
      eventData
    );
    return response.data.event;
  } catch (error) {
    console.error("Error editing event:", error);
    throw error;
  }
};

export const deleteEvent = async (eventId: string): Promise<any> => {
  try {
    const response = await axiosInstance.delete(`/event/events/${eventId}`);

    if (response.data.success) {
      return response.data;
    } else {
      throw new Error("Event deletion failed.");
    }
  } catch (error) {
    console.error("Error deleting event:", error);
    throw error;
  }
};

export const getEvents = async (): Promise<any> => {
  try {
    const response = await axiosInstance.get(`/event/events`);
    return response.data.events.map((item: any) => ({
      id: item._id,
      title: item.title,
      description: item.description,
      image: item.posterImageUrl,
      date: new Date(item.eventDate).toLocaleDateString(),
      startTime: item.startTime,
      endTime: item.endTime,
      location: item.location.address,
      status: item.status,
      tickets: item.tickets,
      tags: item.tags,
    }));
  } catch (error) {
    console.error("Error deleting event:", error);
    throw error;
  }
};
