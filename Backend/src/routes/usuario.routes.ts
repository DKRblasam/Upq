import { Router } from "express";
import { UsuarioController } from "@cont/controllers";
import { verifyToken, checkRole } from "@midd/auth";

const router = Router();

router.get("/", verifyToken, checkRole("Superadm", "adm"), UsuarioController.getUsuarios);
router.get("/:id", verifyToken, checkRole("Superadm", "adm"), UsuarioController.getUsuario);
router.post("/", verifyToken, checkRole("Superadm", "adm"), UsuarioController.createUsuario);
router.put("/:id", verifyToken, checkRole("Superadm", "adm"), UsuarioController.updateUsuario);
router.delete("/:id", verifyToken, checkRole("Superadm", "adm"), UsuarioController.deleteUsuario);

export default router;
