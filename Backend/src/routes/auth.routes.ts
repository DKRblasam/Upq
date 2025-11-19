import { Router } from "express";
import { AuthController } from "@cont/controllers";

const router = Router();

router.post("/login", AuthController.login);

export default router;
