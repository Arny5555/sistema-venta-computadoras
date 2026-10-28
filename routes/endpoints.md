# Mapeo de rutas (API) y consultas MongoDB

Base URL sugerida: `http://localhost:3000/api`  
Base de datos: `tienda_computadoras`

---

## 1. Productos

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/productos` | Listar (`?categoria=`, `?activo=true`) |
| GET | `/api/productos/:id` | Obtener por `_id` |
| POST | `/api/productos` | Crear producto |
| PUT | `/api/productos/:id` | Actualizar |
| DELETE | `/api/productos/:id` | Soft delete (`activo: false`) |

```js
// Listado con proveedor (lookup)
db.productos.aggregate([
  { $match: { activo: true } },
  {
    $lookup: {
      from: 'proveedores',
      localField: 'id_proveedor',
      foreignField: '_id',
      as: 'proveedor'
    }
  },
  { $unwind: '$proveedor' },
  {
    $project: {
      codigo_sku: 1,
      nombre: 1,
      categoria: 1,
      marca: 1,
      precio_unitario: 1,
      stock: 1,
      'proveedor.razon_social': 1
    }
  }
]);
```

---

## 2. Clientes

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/clientes` | Listar |
| GET | `/api/clientes/:id` | Obtener |
| POST | `/api/clientes` | Registrar |
| GET | `/api/clientes/:id/ventas` | Historial de compras |

```js
db.ventas.find(
  { id_cliente: ObjectId('672000000000000000000001') },
  { fecha_venta: 1, total: 1, metodo_pago: 1, estado: 1 }
).sort({ fecha_venta: -1 });
```

---

## 3. Proveedores

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/proveedores` | Listar |
| GET | `/api/proveedores/:id` | Obtener |
| POST | `/api/proveedores` | Crear |
| GET | `/api/proveedores/:id/productos` | Productos del proveedor |

```js
db.productos.find({ id_proveedor: ObjectId('670000000000000000000001') });
```

---

## 4. Ventas

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/ventas` | Listar (`?estado=`, fechas) |
| GET | `/api/ventas/:id` | Cabecera + detalle embebido |
| POST | `/api/ventas` | Registrar venta completa |
| PATCH | `/api/ventas/:id/estado` | Completada / Anulada |

### Body — `POST /api/ventas`

```json
{
  "id_cliente": "672000000000000000000001",
  "metodo_pago": "Tarjeta",
  "items": [
    { "id_producto": "671000000000000000000001", "cantidad": 1, "descuento": 0 },
    { "id_producto": "671000000000000000000005", "cantidad": 2, "descuento": 50 }
  ]
}
```

### Consulta — venta con cliente

```js
db.ventas.aggregate([
  { $match: { _id: ObjectId('673000000000000000000002') } },
  {
    $lookup: {
      from: 'clientes',
      localField: 'id_cliente',
      foreignField: '_id',
      as: 'cliente'
    }
  },
  { $unwind: '$cliente' }
]);
```

### Proceso de venta (transacción)

```js
const session = db.getMongo().startSession();
session.startTransaction();
try {
  const productosCol = session.getDatabase('tienda_computadoras').productos;
  const ventasCol = session.getDatabase('tienda_computadoras').ventas;

  // 1) Validar y descontar stock
  // 2) Insertar venta con detalle embebido
  // 3) commitTransaction()
  session.commitTransaction();
} catch (e) {
  session.abortTransaction();
  throw e;
} finally {
  session.endSession();
}
```

---

## 5. Reportes

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/reportes/productos-mas-vendidos` | Ranking |
| GET | `/api/reportes/stock-bajo` | Stock ≤ umbral |

```js
// Productos más vendidos
db.ventas.aggregate([
  { $match: { estado: 'Completada' } },
  { $unwind: '$detalle' },
  {
    $group: {
      _id: '$detalle.codigo_sku',
      nombre: { $first: '$detalle.nombre' },
      unidades: { $sum: '$detalle.cantidad' },
      ingreso: { $sum: '$detalle.subtotal_linea' }
    }
  },
  { $sort: { unidades: -1 } },
  { $limit: 10 }
]);

// Stock bajo
db.productos.find({ activo: true, stock: { $lte: 10 } }).sort({ stock: 1 });
```
