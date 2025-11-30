import { Router } from "express";

import authRoutes from "./auth.routes";
import userRoutes from "./usuario.routes";
import carreraRoutes from "./carrera.routes";
import cursoRoutes from "./curso.routes";
import maestroRoutes from "./maestro.routes";
import unidadRoutes from "./unidad.routes";
import menuRoutes from "@/routes/menu.routes";
import dashboardRoutes from "@/routes/dashboard.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/carreras", carreraRoutes);
router.use("/cursos", cursoRoutes);
router.use("/maestros", maestroRoutes);
router.use("/unidades", unidadRoutes);
router.use("/menu", menuRoutes);
router.use("/dashboard", dashboardRoutes);

export default router;
