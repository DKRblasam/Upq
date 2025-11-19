import { Router } from "express";
import { UnidadController } from "@cont/controllers";
import { verifyToken, checkRole } from "@midd/auth";

const router = Router();

router.get("/", verifyToken, UnidadController.getUnidades);
router.get("/:id", verifyToken, UnidadController.getUnidad);

router.post(
  "/",
  verifyToken,
  checkRole("Superadm", "adm", "teach"),
  UnidadController.createUnidad
);

router.put(
  "/:id",
  verifyToken,
  checkRole("Superadm", "adm", "teach"),
  UnidadController.updateUnidad
);

router.delete(
  "/:id",
  verifyToken,
  checkRole("Superadm", "adm"),
  UnidadController.deleteUnidad
);

export default router;
