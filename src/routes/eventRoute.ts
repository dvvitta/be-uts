import express from "express";
import {
  getEvents,
  createEvent,
  getEventById,
  updateEvent,
  deleteEvent,
} from "../controllers/eventController";

const router = express.Router();

router.get("/", getEvents);
router.post("/", createEvent);
router.get("/:id", getEventById);
router.put("/:id", updateEvent);
router.delete("/:id", deleteEvent);

export default router;
