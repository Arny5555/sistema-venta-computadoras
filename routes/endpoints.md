# Mapeo de rutas (API) y consultas clave

Documentación de endpoints REST propuestos para el **Sistema para Venta de Computadoras**, alineados con las tablas del modelo relacional.

Base URL sugerida: `http://localhost:3000/api`

---

## 1. Productos

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/productos` | Listar productos (filtros: `?categoria=`, `?activo=1`) |
| GET | `/api/productos/:id` | Obtener un producto por ID |
| POST | `/api/productos` | Crear producto |
| PUT | `/api/productos/:id` | Actualizar producto |
| DELETE | `/api/productos/:id` | Desactivar producto (`activo = 0`) |
| GET | `/api/productos/:id/stock` | Consultar stock disponible |

### Consulta clave — listado con proveedor

```sql
SELECT p.id_producto, p.codigo_sku, p.nombre, p.categoria, p.marca,
       p.precio_unitario, p.stock, p.activo,
       pr.razon_social AS proveedor
FROM productos p
INNER JOIN proveedores pr ON pr.id_proveedor = p.id_proveedor
WHERE p.activo = 1
ORDER BY p.nombre;
```

---

## 2. Clientes

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/clientes` | Listar clientes |
| GET | `/api/clientes/:id` | Obtener cliente por ID |
| POST | `/api/clientes` | Registrar cliente |
| PUT | `/api/clientes/:id` | Actualizar datos del cliente |
| GET | `/api/clientes/:id/ventas` | Historial de ventas del cliente |

### Consulta clave — historial de compras

```sql
SELECT v.id_venta, v.fecha_venta, v.total, v.metodo_pago, v.estado
FROM ventas v
WHERE v.id_cliente = ?
ORDER BY v.fecha_venta DESC;
```

---

## 3. Proveedores

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/proveedores` | Listar proveedores |
| GET | `/api/proveedores/:id` | Obtener proveedor |
| POST | `/api/proveedores` | Crear proveedor |
| PUT | `/api/proveedores/:id` | Actualizar proveedor |
| GET | `/api/proveedores/:id/productos` | Productos abastecidos por el proveedor |

---

## 4. Ventas (proceso principal)

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/ventas` | Listar ventas (`?estado=`, `?desde=`, `?hasta=`) |
| GET | `/api/ventas/:id` | Cabecera + detalle de una venta |
| POST | `/api/ventas` | Registrar venta completa (cabecera + líneas) |
| PATCH | `/api/ventas/:id/estado` | Cambiar estado (Completada / Anulada) |
| GET | `/api/ventas/:id/detalle` | Solo líneas de detalle |

### Body ejemplo — `POST /api/ventas`

```json
{
  "id_cliente": 1,
  "metodo_pago": "Tarjeta",
  "items": [
    { "id_producto": 1, "cantidad": 1, "descuento": 0 },
    { "id_producto": 5, "cantidad": 2, "descuento": 50.00 }
  ]
}
```

### Consulta clave — venta con detalle

```sql
SELECT
  v.id_venta, v.fecha_venta, v.subtotal, v.impuesto, v.total,
  v.metodo_pago, v.estado,
  c.nombres, c.apellidos, c.documento,
  d.id_detalle, d.cantidad, d.precio_unitario, d.descuento, d.subtotal_linea,
  p.codigo_sku, p.nombre AS producto
FROM ventas v
INNER JOIN clientes c      ON c.id_cliente = v.id_cliente
INNER JOIN detalle_venta d ON d.id_venta = v.id_venta
INNER JOIN productos p     ON p.id_producto = d.id_producto
WHERE v.id_venta = ?;
```

---

## 5. Reportes

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/reportes/ventas-periodo` | Totales por rango de fechas |
| GET | `/api/reportes/productos-mas-vendidos` | Ranking de productos |
| GET | `/api/reportes/stock-bajo` | Productos con stock bajo umbral |

### Consulta — productos más vendidos

```sql
SELECT p.codigo_sku, p.nombre,
       SUM(d.cantidad) AS unidades_vendidas,
       SUM(d.subtotal_linea) AS ingreso_bruto
FROM detalle_venta d
INNER JOIN productos p ON p.id_producto = d.id_producto
INNER JOIN ventas v    ON v.id_venta = d.id_venta
WHERE v.estado = 'Completada'
GROUP BY p.id_producto, p.codigo_sku, p.nombre
ORDER BY unidades_vendidas DESC
LIMIT 10;
```

### Consulta — stock bajo

```sql
SELECT id_producto, codigo_sku, nombre, stock, precio_unitario
FROM productos
WHERE activo = 1 AND stock <= 10
ORDER BY stock ASC;
```

---

## 6. Procedimiento almacenado — registrar venta

Transacción atómica: valida stock, inserta cabecera y detalle, descuenta inventario y calcula totales con IGV 18%.

```sql
DELIMITER $$

CREATE PROCEDURE sp_registrar_venta(
  IN p_id_cliente INT,
  IN p_metodo_pago VARCHAR(40),
  IN p_id_producto INT,
  IN p_cantidad INT,
  IN p_descuento DECIMAL(12,2)
)
BEGIN
  DECLARE v_precio DECIMAL(12,2);
  DECLARE v_stock INT;
  DECLARE v_subtotal_linea DECIMAL(12,2);
  DECLARE v_id_venta INT;
  DECLARE v_igv DECIMAL(12,2);
  DECLARE v_total DECIMAL(12,2);

  DECLARE EXIT HANDLER FOR SQLEXCEPTION
  BEGIN
    ROLLBACK;
    RESIGNAL;
  END;

  START TRANSACTION;

  SELECT precio_unitario, stock
    INTO v_precio, v_stock
  FROM productos
  WHERE id_producto = p_id_producto AND activo = 1
  FOR UPDATE;

  IF v_stock IS NULL THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Producto no encontrado o inactivo';
  END IF;

  IF v_stock < p_cantidad THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Stock insuficiente';
  END IF;

  SET v_subtotal_linea = (p_cantidad * v_precio) - IFNULL(p_descuento, 0);
  SET v_igv = ROUND(v_subtotal_linea * 0.18, 2);
  SET v_total = v_subtotal_linea + v_igv;

  INSERT INTO ventas (id_cliente, subtotal, impuesto, total, metodo_pago, estado)
  VALUES (p_id_cliente, v_subtotal_linea, v_igv, v_total, p_metodo_pago, 'Completada');

  SET v_id_venta = LAST_INSERT_ID();

  INSERT INTO detalle_venta (id_venta, id_producto, cantidad, precio_unitario, descuento, subtotal_linea)
  VALUES (v_id_venta, p_id_producto, p_cantidad, v_precio, IFNULL(p_descuento, 0), v_subtotal_linea);

  UPDATE productos
  SET stock = stock - p_cantidad
  WHERE id_producto = p_id_producto;

  COMMIT;

  SELECT v_id_venta AS id_venta, v_total AS total;
END$$

DELIMITER ;
```

### Uso desde la API

`POST /api/ventas` puede invocar `CALL sp_registrar_venta(?, ?, ?, ?, ?)` por cada ítem (o una variante multi-línea) dentro de la misma transacción de aplicación.

---

## 7. Diagrama de flujo del proceso de venta

```
Cliente → POST /api/ventas
            │
            ▼
     Validar cliente y stock
            │
            ▼
     INSERT ventas + detalle_venta
            │
            ▼
     UPDATE productos.stock
            │
            ▼
     Respuesta 201 + id_venta / total
```
