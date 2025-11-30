// backend/src/app.ts
import express, { Application } from "express";
import cors from "cors";
import path from "path";

// Rutas (aunque estén vacías por ahora)
import carreraRoutes from "@/routes/carrera.routes";
import cursoRoutes from "@/routes/curso.routes";
import userRoutes from "@/routes/usuario.routes";
import pingRoutes from "@/routes/ping.routes";
import authRoutes from "@/routes/auth.routes";
import dashboardRoutes from "@/routes/dashboard.routes";
import ticketRoutes from "@/routes/ticket.routes";
import menuRoutes from "@/routes/menu.routes";

const app: Application = express();

// Config
app.use(cors());
app.use(express.json());

// Static (opcional)
app.use("/public", express.static(path.join(__dirname, "..", "public")));

app.use("/api/ping", pingRoutes);
app.use("/api/auth", authRoutes);

// Rutas sin protección
app.use("/api/users", userRoutes);
app.use("/api/carreras", carreraRoutes);
app.use("/api/cursos", cursoRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/tickets", ticketRoutes);
app.use("/api/menu", menuRoutes);

export default app;
