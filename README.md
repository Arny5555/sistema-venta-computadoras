# Sistema para Venta de Computadoras

## Descripción técnica

Proyecto de diseño de base de datos **MongoDB** para un sistema de venta de computadoras y periféricos. Incluye:

- Diccionario de datos y diagrama de colecciones (Mermaid) en `/docs`
- Script de carga inicial (`mongodb_seed.js`) en `/database`
- Documentación de rutas/API y consultas clave en `/routes`

Motor: **MongoDB 7+** (local, Docker o Atlas). Cliente recomendado: **MongoDB Compass**.

### Colecciones

| Colección   | Descripción                                      |
|-------------|--------------------------------------------------|
| proveedores | Empresas que abastecen el inventario             |
| productos   | Computadoras, laptops y componentes en venta     |
| clientes    | Personas que realizan compras                    |
| ventas      | Transacciones con detalle embebido por línea     |

## Datos de identificación

| Campo        | Valor |
|--------------|-------|
| Nombre       | Saravia Chavez Arny Ruben |
| Carrera      |       |
| Asignatura   |       |
| Institución  |       |
| Fecha        | 27/10/2026 |

## Estructura del repositorio

```
sistema-venta-computadoras/
├── README.md
├── docs/
│   └── diccionario_y_diagrama.md
├── database/
│   └── mongodb_seed.js
└── routes/
    └── endpoints.md
```

## Instrucciones de ejecución (MongoDB)

### Opción A — Docker (recomendado)

```bash
docker run -d --name tienda-mongo -p 27017:27017 mongo:7
docker cp database/mongodb_seed.js tienda-mongo:/seed.js
docker exec tienda-mongo mongosh "mongodb://127.0.0.1:27017/tienda_computadoras" /seed.js
```

### Opción B — mongosh local

```bash
mongosh "mongodb://127.0.0.1:27017/tienda_computadoras" database/mongodb_seed.js
```

### Ver en MongoDB Compass

1. Conexión: `mongodb://127.0.0.1:27017`
2. Base de datos: `tienda_computadoras`
3. Colecciones: `proveedores`, `productos`, `clientes`, `ventas`

### Verificar

```js
use tienda_computadoras
show collections
db.productos.find().pretty()
db.ventas.find({ estado: "Completada" }).pretty()
```

## Documentación adicional

- [Diccionario de datos y diagrama](docs/diccionario_y_diagrama.md)
- [Rutas / API y consultas](routes/endpoints.md)
