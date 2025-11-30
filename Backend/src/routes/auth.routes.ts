import { Router } from "express";
import { AuthController } from "@cont/controllers";

const router = Router();

router.post("/login", AuthController.login);
router.post("/register", AuthController.register);
router.post("/generate-code", AuthController.generateCode);

export default router;
