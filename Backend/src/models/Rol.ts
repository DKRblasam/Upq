export type RolUsuario = "Superadm" | "adm" | "teach" | "User";

export interface jwt {
  id: number;          // ID del usuario
  email: string;       // correo del usuario
  roles: string[];     // array de roles reales del usuario
  exp: number;         // fecha de expiración
}
