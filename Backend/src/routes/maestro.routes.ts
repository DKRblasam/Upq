import { Router } from "express";
import { MaestroController } from "@cont/controllers";
import { verifyToken, checkRole } from "@midd/auth";

const router = Router();

router.get("/", verifyToken, checkRole("Superadm", "adm"), MaestroController.getMaestros);

// Maestro puede ver sus cursos, admin también
router.get("/:id/cursos", verifyToken, MaestroController.getMaestroCursos);

// Solo admins asignan cursos
router.post("/asignar", verifyToken, checkRole("Superadm", "adm"), MaestroController.asignarCurso);

export default router;
