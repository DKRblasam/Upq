import { Router } from "express";

import authRoutes from "./auth.routes";
import usuarioRoutes from "./usuario.routes";
import carreraRoutes from "./carrera.routes";
import cursoRoutes from "./curso.routes";
import maestroRoutes from "./maestro.routes";
import unidadRoutes from "./unidad.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/usuarios", usuarioRoutes);
router.use("/carreras", carreraRoutes);
router.use("/cursos", cursoRoutes);
router.use("/maestros", maestroRoutes);
router.use("/unidades", unidadRoutes);

export default router;
