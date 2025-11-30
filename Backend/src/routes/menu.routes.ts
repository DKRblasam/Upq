import { Router } from "express";
import { getHierarchy } from "../controllers/menu.controller";
import { verifyToken } from "@midd/auth";

const router = Router();

router.get("/hierarchy",verifyToken, getHierarchy);

export default router;
