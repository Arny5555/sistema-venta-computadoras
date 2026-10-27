-- ============================================================
-- DML: Datos de prueba — Sistema para Venta de Computadoras
-- Ejecutar DESPUÉS de ddl.sql
-- ============================================================

USE tienda_computadoras;

-- ------------------------------------------------------------
-- Proveedores (5)
-- ------------------------------------------------------------
INSERT INTO proveedores (razon_social, ruc, telefono, email, direccion) VALUES
('TechDistribuciones SAC',   '20123456781', '01-4456789', 'ventas@techdist.pe',     'Av. Javier Prado 1200, Lima'),
('CompuMayorista EIRL',      '20456789123', '01-5567890', 'contacto@compumayor.pe', 'Jr. Lampa 450, Lima'),
('InnovaHardware Peru SAC',  '20567891234', '01-6678901', 'pedidos@innovahw.pe',    'Av. Argentina 890, Callao'),
('GlobalPC Importaciones',   '20678912345', '01-7789012', 'info@globalpc.pe',       'Calle Los Pinos 221, Surco'),
('Andes Componentes SAC',    '20789123456', '01-8890123', 'soporte@andescomp.pe',   'Av. El Sol 330, Arequipa');

-- ------------------------------------------------------------
-- Productos (5+)
-- ------------------------------------------------------------
INSERT INTO productos (id_proveedor, codigo_sku, nombre, categoria, marca, precio_unitario, stock, activo) VALUES
(1, 'LAP-DEL-001', 'Laptop Dell Inspiron 15',        'Laptop',   'Dell',      2899.00, 25, 1),
(1, 'LAP-HP-014',  'Laptop HP Pavilion 14',          'Laptop',   'HP',        2499.00, 18, 1),
(2, 'DES-LEN-220', 'Desktop Lenovo ThinkCentre',     'Desktop',  'Lenovo',    1999.00, 12, 1),
(3, 'MON-SAM-27',  'Monitor Samsung 27" 4K',         'Monitor',  'Samsung',    899.00, 30, 1),
(4, 'TEC-LOG-MX',  'Teclado Logitech MX Keys',       'Periferico','Logitech',  429.00, 40, 1),
(5, 'SSD-KIN-1T',  'SSD Kingston NV2 1TB',           'Almacenamiento','Kingston', 289.00, 50, 1),
(2, 'MOU-RAZ-V3',  'Mouse Razer DeathAdder V3',      'Periferico','Razer',     249.00, 35, 1);

-- ------------------------------------------------------------
-- Clientes (5)
-- ------------------------------------------------------------
INSERT INTO clientes (nombres, apellidos, documento, email, telefono, direccion) VALUES
('Ana María',   'Quispe Rojas',     '45678912', 'ana.quispe@email.com',    '999111222', 'Av. Brasil 500, Magdalena'),
('Carlos',      'Mendoza Torres',   '46789123', 'carlos.mendoza@email.com','988222333', 'Jr. Cusco 120, Cercado'),
('Lucía',       'Vargas Paredes',   '47891234', 'lucia.vargas@email.com',  '977333444', 'Calle Las Flores 88, San Borja'),
('Diego',       'Salazar Huamán',   '48912345', 'diego.salazar@email.com', '966444555', 'Av. Universitaria 2100, San Miguel'),
('María Elena', 'Flores Castillo',  '49012345', 'maria.flores@email.com',  '955555666', 'Av. La Marina 1450, Pueblo Libre');

-- ------------------------------------------------------------
-- Ventas (5)
-- ------------------------------------------------------------
INSERT INTO ventas (id_cliente, fecha_venta, subtotal, impuesto, total, metodo_pago, estado) VALUES
(1, '2026-10-01 10:15:00', 2899.00, 521.82, 3420.82, 'Tarjeta',        'Completada'),
(2, '2026-10-05 14:30:00', 3398.00, 611.64, 4009.64, 'Transferencia',  'Completada'),
(3, '2026-10-10 09:45:00', 1306.00, 235.08, 1541.08, 'Efectivo',       'Completada'),
(4, '2026-10-15 16:20:00', 1999.00, 359.82, 2358.82, 'Tarjeta',        'Pendiente'),
(5, '2026-10-20 11:00:00',  538.00,  96.84,  634.84, 'Yape',           'Completada');

-- ------------------------------------------------------------
-- Detalle de venta (al menos 5 líneas; varias ventas con detalle)
-- ------------------------------------------------------------
INSERT INTO detalle_venta (id_venta, id_producto, cantidad, precio_unitario, descuento, subtotal_linea) VALUES
(1, 1, 1, 2899.00, 0.00, 2899.00),   -- Laptop Dell
(2, 2, 1, 2499.00, 0.00, 2499.00),   -- Laptop HP
(2, 4, 1,  899.00, 0.00,  899.00),   -- Monitor Samsung
(3, 5, 2,  429.00, 50.00, 808.00),   -- 2x Teclado Logitech con descuento
(3, 7, 2,  249.00,  0.00, 498.00),   -- 2x Mouse Razer (808+498=1306)
(4, 3, 1, 1999.00, 0.00, 1999.00),   -- Desktop Lenovo
(5, 6, 1,  289.00, 0.00,  289.00),   -- SSD Kingston
(5, 7, 1,  249.00, 0.00,  249.00);   -- Mouse Razer
