import express from "express";

import {
  addEventController,
  editEventController,
} from "../di/User/Event.dependency.container";

const eventRoutes = express.Router();

eventRoutes.post("/add", (req, res) => addEventController.addEvent(req, res));
eventRoutes.post("/edit/:eventId", (req, res) => editEventController.editEvent(req, res));


export default eventRoutes;
