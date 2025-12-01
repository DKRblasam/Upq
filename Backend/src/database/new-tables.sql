CREATE TABLE IF NOT EXISTS subunidades (
  id INT AUTO_INCREMENT PRIMARY KEY,
  unidad_id INT NOT NULL,
  titulo VARCHAR(255) NOT NULL,
  descripcion TEXT,
  orden INT DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (unidad_id) REFERENCES unidades(id) ON DELETE CASCADE,
  INDEX idx_unidad (unidad_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS contenidos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  subunidad_id INT NOT NULL,
  tipo ENUM('video','documento','imagen','link','texto') NOT NULL,
  titulo VARCHAR(255) NOT NULL,
  descripcion TEXT,
  url TEXT,
  metadata JSON,
  orden INT DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (subunidad_id) REFERENCES subunidades(id) ON DELETE CASCADE,
  INDEX idx_subunidad (subunidad_id),
  INDEX idx_tipo (tipo)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
