import { Router } from "express";
import { ContenidoController } from "../controllers/contenido.controller";
// import { authenticateToken, authorizeRole } from "../middleware/auth.middleware";

const router = Router();

// router.use(authenticateToken);

router.post("/", ContenidoController.create);
router.get("/subunidad/:subunidadId", ContenidoController.getBySubunidad);
router.put("/:id", ContenidoController.update);
router.delete("/:id", ContenidoController.delete);

export default router;
