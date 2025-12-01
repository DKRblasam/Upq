import { Router } from "express";
import {
  getHierarchy,
  addNode,
  deleteNode,
  getNode,
} from "../controllers/menu.controller";
import { verifyToken } from "@midd/auth";
import { getCarrera, getCarreras } from "@/controllers/carrera.controller";

const router = Router();

router.get("/carreras", getCarreras);
router.get("/carrera/:id", getCarrera);
router.get("/hierarchy", getHierarchy);
router.post("/node", addNode);
router.delete("/node/:type/:id", deleteNode);
router.get("/node/:type/:id", getNode);

export default router;
