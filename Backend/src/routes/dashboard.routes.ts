import { Router } from "express";
import { getData } from "../controllers/dashboard.controller";
import { verifyToken } from "@midd/auth";

const router = Router();

router.get("/data", verifyToken, getData);

export default router;
