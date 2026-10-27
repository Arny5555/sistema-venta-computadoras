# Sistema para Venta de Computadoras

## Descripción técnica

Proyecto de diseño conceptual, lógico y físico de base de datos para un sistema de venta de computadoras y periféricos. Incluye:

- Diccionario de datos y Diagrama Entidad-Relación (Mermaid) en `/docs`
- Scripts DDL (creación de tablas, claves y restricciones) y DML (datos de prueba) en `/database`
- Documentación de rutas/API y consultas clave del proceso de venta en `/routes`

Motor de base de datos recomendado: **MySQL 8+** o **MariaDB 10.5+** (también compatible con PostgreSQL con ajustes menores de sintaxis).

Modelo relacional principal:

| Entidad      | Descripción                                      |
|--------------|--------------------------------------------------|
| proveedores  | Empresas que abastecen el inventario             |
| productos    | Computadoras, laptops y componentes en venta     |
| clientes     | Personas o empresas que realizan compras         |
| ventas       | Cabecera de cada transacción de venta            |
| detalle_venta| Líneas de productos asociados a cada venta       |

## Datos de identificación

| Campo        | Valor |
|--------------|-------|
| Nombre       |       |
| Carrera      |       |
| Asignatura   |       |
| Institución  |       |
| Fecha        |       |

> Completa este bloque con tus datos personales antes de la entrega final.

## Estructura del repositorio

```
sistema-venta-computadoras/
├── README.md
├── docs/
│   └── diccionario_y_diagrama.md
├── database/
│   ├── ddl.sql
│   └── dml.sql
└── routes/
    └── endpoints.md
```

## Instrucciones de ejecución de la base de datos

### Requisitos previos

1. Tener instalado MySQL o MariaDB.
2. Acceso a un cliente SQL (MySQL Workbench, DBeaver, CLI `mysql`, o similar).

### Paso 1 — Crear la base de datos

```bash
mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS tienda_computadoras CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
```

### Paso 2 — Ejecutar el script DDL (estructura)

```bash
mysql -u root -p tienda_computadoras < database/ddl.sql
```

Esto crea las tablas `proveedores`, `productos`, `clientes`, `ventas` y `detalle_venta`, con claves primarias, foráneas e índices.

### Paso 3 — Ejecutar el script DML (datos de prueba)

```bash
mysql -u root -p tienda_computadoras < database/dml.sql
```

Inserta al menos 5 registros de prueba en cada tabla.

### Paso 4 — Verificar

```sql
USE tienda_computadoras;
SHOW TABLES;
SELECT COUNT(*) AS total_productos FROM productos;
SELECT COUNT(*) AS total_ventas FROM ventas;
```

### Nota sobre MongoDB Compass

Este entregable usa un **modelo relacional SQL**. Si tienes MongoDB Compass abierto, puedes usarlo para otros ejercicios NoSQL del curso; para este proyecto ejecuta los scripts `.sql` en MySQL/MariaDB.

## Documentación adicional

- [Diccionario de datos y Diagrama ER](docs/diccionario_y_diagrama.md)
- [Rutas / API y consultas clave](routes/endpoints.md)
