import { Router } from "express";
import { CarreraController } from "@cont/controllers";
import { verifyToken, checkRole } from "@midd/auth";

const router = Router();

router.get("/", verifyToken, CarreraController.getCarreras);
router.get("/:id", verifyToken, CarreraController.getCarrera);

router.post("/", verifyToken, checkRole("Superadm", "adm"), CarreraController.createCarrera);
router.put("/:id", verifyToken, checkRole("Superadm", "adm"), CarreraController.updateCarrera);
router.delete("/:id", verifyToken, checkRole("Superadm", "adm"), CarreraController.deleteCarrera);

export default router;
