import { ListAllEventsController } from "../../../interface-apdaters/controllers/admin/Events/LIstEVent.controller";
import { ListAllEvents } from "../../../use-cases/admin/EVents/ListEvents";
import { EventRepository } from "../../../interface-apdaters/repositories/Admin/Events/event.repository";

const eventRepository = new EventRepository();

// Initialize use case
const listAllEvents = new ListAllEvents(eventRepository);

// Initialize controller
const listAllEventsController = new ListAllEventsController(listAllEvents);


export { listAllEventsController };