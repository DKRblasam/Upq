import { Router } from "express";
import { CursoController } from "@cont/controllers";
import { verifyToken, checkRole } from "@midd/auth";

const router = Router();

router.get("/", verifyToken, CursoController.getCursos);
router.get("/:id", verifyToken, CursoController.getCurso);

router.post("/", verifyToken, checkRole("Superadm", "adm"), CursoController.createCurso);
router.put("/:id", verifyToken, checkRole("Superadm", "adm"), CursoController.updateCurso);
router.delete("/:id", verifyToken, checkRole("Superadm", "adm"), CursoController.deleteCurso);

export default router;
