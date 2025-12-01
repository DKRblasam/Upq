import { Router } from "express";
import { createTicket, getTickets } from "@/controllers/ticket.controller";
import { verifyToken } from "@midd/auth";

const router = Router();

router.post("/", createTicket);
router.get("/", verifyToken, getTickets);

export default router;
