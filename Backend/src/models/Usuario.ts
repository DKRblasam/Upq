import { RolUsuario } from "./Rol";

export interface Usuario {
  id: number;
  nombre: string;
  usuario: string;
  passw: string;
  matricula: string;
  rol: RolUsuario;
  activo: number;
  created_at: string;   // ISO Timestamp
  updated_at: string;   // ISO Timestamp
}
