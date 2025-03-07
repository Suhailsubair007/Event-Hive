import adminAxiosInstance from "@/config/adminAxiosInstance";
import { PaginationParams, EventsResponse } from "../../types/admin-event-type";

export const fetchEvents = async ({
  page,
  limit,
}: PaginationParams): Promise<EventsResponse> => {
  try {
    const response = await adminAxiosInstance.get<EventsResponse>(
      "/admin/events",
      {
        params: { page, limit },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
};
