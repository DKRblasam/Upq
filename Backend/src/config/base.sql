empecemos con el backend, la bd es:

-- =========================================================
-- TABLA: usuarios
-- =========================================================
CREATE TABLE IF NOT EXISTS usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  usuario VARCHAR(100) NOT NULL UNIQUE,
  passw VARCHAR(255) NOT NULL,
  rol ENUM('Superadm', 'adm', 'teach', 'User') NOT NULL DEFAULT 'User',
  activo BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_usuario (usuario),
  INDEX idx_rol (rol),
  INDEX idx_activo (activo)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =========================================================
-- TABLA: carreras
-- =========================================================
CREATE TABLE IF NOT EXISTS carreras (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  descripcion TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_nombre (nombre)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =========================================================
-- TABLA: cursos
-- =========================================================
CREATE TABLE IF NOT EXISTS cursos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  descripcion TEXT,
  id_carrera INT NOT NULL,
  cuatri INT NOT NULL CHECK (cuatri BETWEEN 1 AND 12),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (id_carrera) REFERENCES carreras(id) ON DELETE CASCADE,
  INDEX idx_carrera (id_carrera),
  INDEX idx_cuatri (cuatri),
  INDEX idx_nombre (nombre)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =========================================================
-- TABLA: cursos_maestros (relación N:M)
-- =========================================================
CREATE TABLE IF NOT EXISTS cursos_maestros (
  id INT AUTO_INCREMENT PRIMARY KEY,
  id_curso INT NOT NULL,
  id_maestro INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_curso) REFERENCES cursos(id) ON DELETE CASCADE,
  FOREIGN KEY (id_maestro) REFERENCES usuarios(id) ON DELETE CASCADE,
  UNIQUE KEY unique_curso_maestro (id_curso, id_maestro),
  INDEX idx_curso (id_curso),
  INDEX idx_maestro (id_maestro)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =========================================================
-- TABLA: unidades
-- =========================================================
CREATE TABLE IF NOT EXISTS unidades (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(255) NOT NULL,
  contenido TEXT,
  id_curso INT NOT NULL,
  id_maestro INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (id_curso) REFERENCES cursos(id) ON DELETE CASCADE,
  FOREIGN KEY (id_maestro) REFERENCES usuarios(id) ON DELETE CASCADE,
  INDEX idx_curso (id_curso),
  INDEX idx_maestro (id_maestro)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =========================================================
-- DATOS DE EJEMPLO
-- =========================================================

-- Usuario Superadmin (contraseña: admin123)
INSERT INTO usuarios (nombre, usuario, passw, rol, activo) VALUES
('Super Administrador', 'superadmin', '$2b$10$K8QJZ3qPR3gXvL5Y7xGMJ.8fH9xYzXqJvN4K2fXqE5rL6Y3wH9xYz', 'Superadm', TRUE);

-- Usuario Admin (contraseña: admin123)
INSERT INTO usuarios (nombre, usuario, passw, rol, activo) VALUES
('Administrador', 'admin', '$2b$10$K8QJZ3qPR3gXvL5Y7xGMJ.8fH9xYzXqJvN4K2fXqE5rL6Y3wH9xYz', 'adm', TRUE);

-- Usuario Maestro (contraseña: maestro123)
INSERT INTO usuarios (nombre, usuario, passw, rol, activo) VALUES
('Juan Pérez', 'jperez', '$2b$10$K8QJZ3qPR3gXvL5Y7xGMJ.8fH9xYzXqJvN4K2fXqE5rL6Y3wH9xYz', 'teach', TRUE),
('María García', 'mgarcia', '$2b$10$K8QJZ3qPR3gXvL5Y7xGMJ.8fH9xYzXqJvN4K2fXqE5rL6Y3wH9xYz', 'teach', TRUE);

-- Usuario Normal (contraseña: user123)
INSERT INTO usuarios (nombre, usuario, passw, rol, activo) VALUES
('Estudiante Uno', 'estudiante1', '$2b$10$K8QJZ3qPR3gXvL5Y7xGMJ.8fH9xYzXqJvN4K2fXqE5rL6Y3wH9xYz', 'User', TRUE);

-- Carreras de ejemplo
INSERT INTO carreras (nombre, descripcion) VALUES
('Ingeniería en Sistemas Computacionales', 'Carrera enfocada en el desarrollo de software y administración de sistemas'),
('Ingeniería Industrial', 'Carrera enfocada en la optimización de procesos productivos'),
('Licenciatura en Administración', 'Carrera enfocada en la gestión empresarial');

-- Cursos de ejemplo
INSERT INTO cursos (nombre, descripcion, id_carrera, cuatri) VALUES
('Programación Básica', 'Fundamentos de programación', 1, 1),
('Base de Datos', 'Diseño y administración de bases de datos', 1, 3),
('Desarrollo Web', 'Creación de aplicaciones web', 1, 5),
('Cálculo Diferencial', 'Fundamentos de cálculo', 2, 1),
('Estadística', 'Análisis estadístico', 2, 2);

-- Asignar maestros a cursos
INSERT INTO cursos_maestros (id_curso, id_maestro) VALUES
(1, 3), -- Juan Pérez enseña Programación Básica
(2, 3), -- Juan Pérez enseña Base de Datos
(3, 4), -- María García enseña Desarrollo Web
(4, 4); -- María García enseña Cálculo Diferencial

-- Unidades de ejemplo
INSERT INTO unidades (titulo, contenido, id_curso, id_maestro) VALUES
('Introducción a la Programación', 'Conceptos básicos de algoritmos y lógica de programación', 1, 3),
('Variables y Tipos de Datos', 'Declaración y uso de variables en programación', 1, 3),
('Estructuras de Control', 'If, else, switch y ciclos', 1, 3),
('Modelo Relacional', 'Conceptos del modelo relacional de bases de datos', 2, 3),
('SQL Básico', 'Consultas SELECT, INSERT, UPDATE, DELETE', 2, 3);

-- =========================================================
-- VISTAS ÚTILES
-- =========================================================

-- Vista: Cursos con información completa
CREATE OR REPLACE VIEW v_cursos_completos AS
SELECT 
  c.id,
  c.nombre AS curso_nombre,
  c.descripcion AS curso_descripcion,
  c.cuatri,
  ca.id AS carrera_id,
  ca.nombre AS carrera_nombre,
  COUNT(DISTINCT cm.id_maestro) AS num_maestros,
  COUNT(DISTINCT u.id) AS num_unidades
FROM cursos c
JOIN carreras ca ON c.id_carrera = ca.id
LEFT JOIN cursos_maestros cm ON c.id = cm.id_curso
LEFT JOIN unidades u ON c.id = u.id_curso
GROUP BY c.id, c.nombre, c.descripcion, c.cuatri, ca.id, ca.nombre;

-- Vista: Maestros con sus cursos asignados
CREATE OR REPLACE VIEW v_maestros_cursos AS
SELECT 
  u.id AS maestro_id,
  u.nombre AS maestro_nombre,
  u.usuario AS maestro_usuario,
  c.id AS curso_id,
  c.nombre AS curso_nombre,
  ca.nombre AS carrera_nombre,
  c.cuatri,
  cm.id AS asignacion_id
FROM usuarios u
JOIN cursos_maestros cm ON u.id = cm.id_maestro
JOIN cursos c ON cm.id_curso = c.id
JOIN carreras ca ON c.id_carrera = ca.id
WHERE u.rol = 'teach';

-- =========================================================
-- PROCEDIMIENTOS ALMACENADOS
-- =========================================================

DELIMITER //

-- Procedimiento: Asignar maestro a curso con validaciones
CREATE PROCEDURE sp_asignar_maestro_curso(
  IN p_id_curso INT,
  IN p_id_maestro INT
)
BEGIN
  DECLARE v_maestro_rol VARCHAR(20);
  DECLARE v_existe_asignacion INT;
  
  -- Verificar que el usuario es maestro
  SELECT rol INTO v_maestro_rol 
  FROM usuarios 
  WHERE id = p_id_maestro;
  
  IF v_maestro_rol != 'teach' THEN
    SIGNAL SQLSTATE '45000'
    SET MESSAGE_TEXT = 'El usuario no tiene rol de maestro';
  END IF;
  
  -- Verificar si ya existe la asignación
  SELECT COUNT(*) INTO v_existe_asignacion
  FROM cursos_maestros
  WHERE id_curso = p_id_curso AND id_maestro = p_id_maestro;
  
  IF v_existe_asignacion > 0 THEN
    SIGNAL SQLSTATE '45000'
    SET MESSAGE_TEXT = 'El maestro ya está asignado a este curso';
  END IF;
  
  -- Insertar asignación
  INSERT INTO cursos_maestros (id_curso, id_maestro)
  VALUES (p_id_curso, p_id_maestro);
  
  SELECT 'Asignación creada exitosamente' AS mensaje;
END //

DELIMITER ;

-- =========================================================
-- TRIGGERS
-- =========================================================

DELIMITER //

-- Trigger: Validar rol antes de asignar maestro
CREATE TRIGGER tr_validar_rol_maestro
BEFORE INSERT ON cursos_maestros
FOR EACH ROW
BEGIN
  DECLARE v_rol VARCHAR(20);
  
  SELECT rol INTO v_rol
  FROM usuarios
  WHERE id = NEW.id_maestro;
  
  IF v_rol != 'teach' THEN
    SIGNAL SQLSTATE '45000'
    SET MESSAGE_TEXT = 'Solo usuarios con rol maestro pueden ser asignados a cursos';
  END IF;
END //

DELIMITER ;

-- =========================================================
-- ÍNDICES ADICIONALES PARA OPTIMIZACIÓN
-- =========================================================

-- Índices compuestos para búsquedas frecuentes
CREATE INDEX idx_curso_carrera_cuatri ON cursos(id_carrera, cuatri);
CREATE INDEX idx_unidad_curso_maestro ON unidades(id_curso, id_maestro);

-- =========================================================
-- NOTA: CONTRASEÑAS DE EJEMPLO
-- =========================================================
-- Las contraseñas hasheadas en los ejemplos corresponden a:
-- - superadmin: admin123
-- - admin: admin123
-- - jperez: maestro123
-- - mgarcia: maestro123
-- - estudiante1: user123
--
-- Para generar nuevos hashes, usa bcrypt con salt rounds = 10