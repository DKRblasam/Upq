import { Router } from "express";
import { SubunidadController } from "../controllers/subunidad.controller";
// import { authenticateToken, authorizeRole } from "../middleware/auth.middleware";

const router = Router();

// Public or protected routes? Assuming protected for modification
// router.use(authenticateToken);

router.post("/", SubunidadController.create);
router.get("/unidad/:unidadId", SubunidadController.getByUnidad);
router.put("/:id", SubunidadController.update);
router.delete("/:id", SubunidadController.delete);

export default router;
