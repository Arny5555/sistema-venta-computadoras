-- ============================================================
-- DDL: Sistema para Venta de Computadoras
-- Motor: MySQL 8+ / MariaDB 10.5+
-- ============================================================

CREATE DATABASE IF NOT EXISTS tienda_computadoras
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE tienda_computadoras;

-- Orden de eliminación por dependencias (desarrollo / reinicio)
SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS detalle_venta;
DROP TABLE IF EXISTS ventas;
DROP TABLE IF EXISTS productos;
DROP TABLE IF EXISTS clientes;
DROP TABLE IF EXISTS proveedores;
SET FOREIGN_KEY_CHECKS = 1;

-- ------------------------------------------------------------
-- Tabla: proveedores
-- ------------------------------------------------------------
CREATE TABLE proveedores (
  id_proveedor    INT            NOT NULL AUTO_INCREMENT,
  razon_social    VARCHAR(150)   NOT NULL,
  ruc             VARCHAR(20)    NOT NULL,
  telefono        VARCHAR(20)    NULL,
  email           VARCHAR(100)   NULL,
  direccion       VARCHAR(200)   NULL,
  fecha_registro  DATETIME       NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id_proveedor),
  UNIQUE KEY uk_proveedores_ruc (ruc)
) ENGINE=InnoDB;

-- ------------------------------------------------------------
-- Tabla: productos
-- ------------------------------------------------------------
CREATE TABLE productos (
  id_producto      INT            NOT NULL AUTO_INCREMENT,
  id_proveedor     INT            NOT NULL,
  codigo_sku       VARCHAR(50)    NOT NULL,
  nombre           VARCHAR(150)   NOT NULL,
  categoria        VARCHAR(80)    NOT NULL,
  marca            VARCHAR(80)    NOT NULL,
  precio_unitario  DECIMAL(12,2)  NOT NULL,
  stock            INT            NOT NULL DEFAULT 0,
  activo           TINYINT(1)     NOT NULL DEFAULT 1,
  PRIMARY KEY (id_producto),
  UNIQUE KEY uk_productos_sku (codigo_sku),
  CONSTRAINT fk_productos_proveedor
    FOREIGN KEY (id_proveedor) REFERENCES proveedores (id_proveedor)
    ON UPDATE CASCADE
    ON DELETE RESTRICT,
  CONSTRAINT chk_productos_precio CHECK (precio_unitario > 0),
  CONSTRAINT chk_productos_stock  CHECK (stock >= 0)
) ENGINE=InnoDB;

-- ------------------------------------------------------------
-- Tabla: clientes
-- ------------------------------------------------------------
CREATE TABLE clientes (
  id_cliente       INT            NOT NULL AUTO_INCREMENT,
  nombres          VARCHAR(100)   NOT NULL,
  apellidos        VARCHAR(100)   NOT NULL,
  documento        VARCHAR(20)    NOT NULL,
  email            VARCHAR(100)   NULL,
  telefono         VARCHAR(20)    NULL,
  direccion        VARCHAR(200)   NULL,
  fecha_registro   DATETIME       NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id_cliente),
  UNIQUE KEY uk_clientes_documento (documento)
) ENGINE=InnoDB;

-- ------------------------------------------------------------
-- Tabla: ventas
-- ------------------------------------------------------------
CREATE TABLE ventas (
  id_venta         INT            NOT NULL AUTO_INCREMENT,
  id_cliente       INT            NOT NULL,
  fecha_venta      DATETIME       NOT NULL DEFAULT CURRENT_TIMESTAMP,
  subtotal         DECIMAL(12,2)  NOT NULL DEFAULT 0,
  impuesto         DECIMAL(12,2)  NOT NULL DEFAULT 0,
  total            DECIMAL(12,2)  NOT NULL DEFAULT 0,
  metodo_pago      VARCHAR(40)    NOT NULL,
  estado           VARCHAR(20)    NOT NULL DEFAULT 'Pendiente',
  PRIMARY KEY (id_venta),
  CONSTRAINT fk_ventas_cliente
    FOREIGN KEY (id_cliente) REFERENCES clientes (id_cliente)
    ON UPDATE CASCADE
    ON DELETE RESTRICT,
  CONSTRAINT chk_ventas_montos CHECK (subtotal >= 0 AND impuesto >= 0 AND total >= 0),
  CONSTRAINT chk_ventas_estado CHECK (estado IN ('Pendiente', 'Completada', 'Anulada'))
) ENGINE=InnoDB;

-- ------------------------------------------------------------
-- Tabla: detalle_venta
-- ------------------------------------------------------------
CREATE TABLE detalle_venta (
  id_detalle       INT            NOT NULL AUTO_INCREMENT,
  id_venta         INT            NOT NULL,
  id_producto      INT            NOT NULL,
  cantidad         INT            NOT NULL,
  precio_unitario  DECIMAL(12,2)  NOT NULL,
  descuento        DECIMAL(12,2)  NOT NULL DEFAULT 0,
  subtotal_linea   DECIMAL(12,2)  NOT NULL,
  PRIMARY KEY (id_detalle),
  CONSTRAINT fk_detalle_venta
    FOREIGN KEY (id_venta) REFERENCES ventas (id_venta)
    ON UPDATE CASCADE
    ON DELETE CASCADE,
  CONSTRAINT fk_detalle_producto
    FOREIGN KEY (id_producto) REFERENCES productos (id_producto)
    ON UPDATE CASCADE
    ON DELETE RESTRICT,
  CONSTRAINT chk_detalle_cantidad CHECK (cantidad > 0),
  CONSTRAINT chk_detalle_precio   CHECK (precio_unitario > 0),
  CONSTRAINT chk_detalle_descuento CHECK (descuento >= 0)
) ENGINE=InnoDB;

-- Índices de apoyo a consultas frecuentes
CREATE INDEX idx_productos_categoria ON productos (categoria);
CREATE INDEX idx_productos_proveedor ON productos (id_proveedor);
CREATE INDEX idx_ventas_cliente      ON ventas (id_cliente);
CREATE INDEX idx_ventas_fecha        ON ventas (fecha_venta);
CREATE INDEX idx_detalle_venta       ON detalle_venta (id_venta);
CREATE INDEX idx_detalle_producto    ON detalle_venta (id_producto);
