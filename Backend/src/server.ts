// backend/src/server.ts
import "dotenv/config";
import app from "./app";
import { db } from "@/config/db";

const PORT = process.env.DB_PORT || 4000;

(async () => {
  try {
    console.log("📡 Conectando a la base de datos...");
    await db.getConnection();
    console.log("✅ Base de datos conectada.");

    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Error al iniciar el servidor:", error);
    process.exit(1);
  }
})();
