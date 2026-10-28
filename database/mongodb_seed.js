// Seed MongoDB — Sistema para Venta de Computadoras
// Uso: mongosh "mongodb://127.0.0.1:27017/tienda_computadoras" database/mongodb_seed.js

const dbName = 'tienda_computadoras';
db = db.getSiblingDB(dbName);

db.proveedores.drop();
db.productos.drop();
db.clientes.drop();
db.ventas.drop();

const proveedores = [
  {
    _id: ObjectId('670000000000000000000001'),
    razon_social: 'TechDistribuciones SAC',
    ruc: '20123456781',
    telefono: '01-4456789',
    email: 'ventas@techdist.pe',
    direccion: 'Av. Javier Prado 1200, Lima',
    fecha_registro: ISODate('2026-01-10T10:00:00Z')
  },
  {
    _id: ObjectId('670000000000000000000002'),
    razon_social: 'CompuMayorista EIRL',
    ruc: '20456789123',
    telefono: '01-5567890',
    email: 'contacto@compumayor.pe',
    direccion: 'Jr. Lampa 450, Lima',
    fecha_registro: ISODate('2026-01-12T10:00:00Z')
  },
  {
    _id: ObjectId('670000000000000000000003'),
    razon_social: 'InnovaHardware Peru SAC',
    ruc: '20567891234',
    telefono: '01-6678901',
    email: 'pedidos@innovahw.pe',
    direccion: 'Av. Argentina 890, Callao',
    fecha_registro: ISODate('2026-01-15T10:00:00Z')
  },
  {
    _id: ObjectId('670000000000000000000004'),
    razon_social: 'GlobalPC Importaciones',
    ruc: '20678912345',
    telefono: '01-7789012',
    email: 'info@globalpc.pe',
    direccion: 'Calle Los Pinos 221, Surco',
    fecha_registro: ISODate('2026-01-18T10:00:00Z')
  },
  {
    _id: ObjectId('670000000000000000000005'),
    razon_social: 'Andes Componentes SAC',
    ruc: '20789123456',
    telefono: '01-8890123',
    email: 'soporte@andescomp.pe',
    direccion: 'Av. El Sol 330, Arequipa',
    fecha_registro: ISODate('2026-01-20T10:00:00Z')
  }
];

const productos = [
  {
    _id: ObjectId('671000000000000000000001'),
    id_proveedor: ObjectId('670000000000000000000001'),
    codigo_sku: 'LAP-DEL-001',
    nombre: 'Laptop Dell Inspiron 15',
    categoria: 'Laptop',
    marca: 'Dell',
    precio_unitario: 2899.0,
    stock: 25,
    activo: true
  },
  {
    _id: ObjectId('671000000000000000000002'),
    id_proveedor: ObjectId('670000000000000000000001'),
    codigo_sku: 'LAP-HP-014',
    nombre: 'Laptop HP Pavilion 14',
    categoria: 'Laptop',
    marca: 'HP',
    precio_unitario: 2499.0,
    stock: 18,
    activo: true
  },
  {
    _id: ObjectId('671000000000000000000003'),
    id_proveedor: ObjectId('670000000000000000000002'),
    codigo_sku: 'DES-LEN-220',
    nombre: 'Desktop Lenovo ThinkCentre',
    categoria: 'Desktop',
    marca: 'Lenovo',
    precio_unitario: 1999.0,
    stock: 12,
    activo: true
  },
  {
    _id: ObjectId('671000000000000000000004'),
    id_proveedor: ObjectId('670000000000000000000003'),
    codigo_sku: 'MON-SAM-27',
    nombre: 'Monitor Samsung 27" 4K',
    categoria: 'Monitor',
    marca: 'Samsung',
    precio_unitario: 899.0,
    stock: 30,
    activo: true
  },
  {
    _id: ObjectId('671000000000000000000005'),
    id_proveedor: ObjectId('670000000000000000000004'),
    codigo_sku: 'TEC-LOG-MX',
    nombre: 'Teclado Logitech MX Keys',
    categoria: 'Periferico',
    marca: 'Logitech',
    precio_unitario: 429.0,
    stock: 40,
    activo: true
  },
  {
    _id: ObjectId('671000000000000000000006'),
    id_proveedor: ObjectId('670000000000000000000005'),
    codigo_sku: 'SSD-KIN-1T',
    nombre: 'SSD Kingston NV2 1TB',
    categoria: 'Almacenamiento',
    marca: 'Kingston',
    precio_unitario: 289.0,
    stock: 50,
    activo: true
  },
  {
    _id: ObjectId('671000000000000000000007'),
    id_proveedor: ObjectId('670000000000000000000002'),
    codigo_sku: 'MOU-RAZ-V3',
    nombre: 'Mouse Razer DeathAdder V3',
    categoria: 'Periferico',
    marca: 'Razer',
    precio_unitario: 249.0,
    stock: 35,
    activo: true
  }
];

const clientes = [
  {
    _id: ObjectId('672000000000000000000001'),
    nombres: 'Ana María',
    apellidos: 'Quispe Rojas',
    documento: '45678912',
    email: 'ana.quispe@email.com',
    telefono: '999111222',
    direccion: 'Av. Brasil 500, Magdalena',
    fecha_registro: ISODate('2026-02-01T10:00:00Z')
  },
  {
    _id: ObjectId('672000000000000000000002'),
    nombres: 'Carlos',
    apellidos: 'Mendoza Torres',
    documento: '46789123',
    email: 'carlos.mendoza@email.com',
    telefono: '988222333',
    direccion: 'Jr. Cusco 120, Cercado',
    fecha_registro: ISODate('2026-02-03T10:00:00Z')
  },
  {
    _id: ObjectId('672000000000000000000003'),
    nombres: 'Lucía',
    apellidos: 'Vargas Paredes',
    documento: '47891234',
    email: 'lucia.vargas@email.com',
    telefono: '977333444',
    direccion: 'Calle Las Flores 88, San Borja',
    fecha_registro: ISODate('2026-02-05T10:00:00Z')
  },
  {
    _id: ObjectId('672000000000000000000004'),
    nombres: 'Diego',
    apellidos: 'Salazar Huamán',
    documento: '48912345',
    email: 'diego.salazar@email.com',
    telefono: '966444555',
    direccion: 'Av. Universitaria 2100, San Miguel',
    fecha_registro: ISODate('2026-02-07T10:00:00Z')
  },
  {
    _id: ObjectId('672000000000000000000005'),
    nombres: 'María Elena',
    apellidos: 'Flores Castillo',
    documento: '49012345',
    email: 'maria.flores@email.com',
    telefono: '955555666',
    direccion: 'Av. La Marina 1450, Pueblo Libre',
    fecha_registro: ISODate('2026-02-09T10:00:00Z')
  }
];

// Ventas con detalle embebido (estilo documental típico de MongoDB)
const ventas = [
  {
    _id: ObjectId('673000000000000000000001'),
    id_cliente: ObjectId('672000000000000000000001'),
    fecha_venta: ISODate('2026-10-01T15:15:00Z'),
    subtotal: 2899.0,
    impuesto: 521.82,
    total: 3420.82,
    metodo_pago: 'Tarjeta',
    estado: 'Completada',
    detalle: [
      {
        id_producto: ObjectId('671000000000000000000001'),
        codigo_sku: 'LAP-DEL-001',
        nombre: 'Laptop Dell Inspiron 15',
        cantidad: 1,
        precio_unitario: 2899.0,
        descuento: 0,
        subtotal_linea: 2899.0
      }
    ]
  },
  {
    _id: ObjectId('673000000000000000000002'),
    id_cliente: ObjectId('672000000000000000000002'),
    fecha_venta: ISODate('2026-10-05T19:30:00Z'),
    subtotal: 3398.0,
    impuesto: 611.64,
    total: 4009.64,
    metodo_pago: 'Transferencia',
    estado: 'Completada',
    detalle: [
      {
        id_producto: ObjectId('671000000000000000000002'),
        codigo_sku: 'LAP-HP-014',
        nombre: 'Laptop HP Pavilion 14',
        cantidad: 1,
        precio_unitario: 2499.0,
        descuento: 0,
        subtotal_linea: 2499.0
      },
      {
        id_producto: ObjectId('671000000000000000000004'),
        codigo_sku: 'MON-SAM-27',
        nombre: 'Monitor Samsung 27" 4K',
        cantidad: 1,
        precio_unitario: 899.0,
        descuento: 0,
        subtotal_linea: 899.0
      }
    ]
  },
  {
    _id: ObjectId('673000000000000000000003'),
    id_cliente: ObjectId('672000000000000000000003'),
    fecha_venta: ISODate('2026-10-10T14:45:00Z'),
    subtotal: 1306.0,
    impuesto: 235.08,
    total: 1541.08,
    metodo_pago: 'Efectivo',
    estado: 'Completada',
    detalle: [
      {
        id_producto: ObjectId('671000000000000000000005'),
        codigo_sku: 'TEC-LOG-MX',
        nombre: 'Teclado Logitech MX Keys',
        cantidad: 2,
        precio_unitario: 429.0,
        descuento: 50.0,
        subtotal_linea: 808.0
      },
      {
        id_producto: ObjectId('671000000000000000000007'),
        codigo_sku: 'MOU-RAZ-V3',
        nombre: 'Mouse Razer DeathAdder V3',
        cantidad: 2,
        precio_unitario: 249.0,
        descuento: 0,
        subtotal_linea: 498.0
      }
    ]
  },
  {
    _id: ObjectId('673000000000000000000004'),
    id_cliente: ObjectId('672000000000000000000004'),
    fecha_venta: ISODate('2026-10-15T21:20:00Z'),
    subtotal: 1999.0,
    impuesto: 359.82,
    total: 2358.82,
    metodo_pago: 'Tarjeta',
    estado: 'Pendiente',
    detalle: [
      {
        id_producto: ObjectId('671000000000000000000003'),
        codigo_sku: 'DES-LEN-220',
        nombre: 'Desktop Lenovo ThinkCentre',
        cantidad: 1,
        precio_unitario: 1999.0,
        descuento: 0,
        subtotal_linea: 1999.0
      }
    ]
  },
  {
    _id: ObjectId('673000000000000000000005'),
    id_cliente: ObjectId('672000000000000000000005'),
    fecha_venta: ISODate('2026-10-20T16:00:00Z'),
    subtotal: 538.0,
    impuesto: 96.84,
    total: 634.84,
    metodo_pago: 'Yape',
    estado: 'Completada',
    detalle: [
      {
        id_producto: ObjectId('671000000000000000000006'),
        codigo_sku: 'SSD-KIN-1T',
        nombre: 'SSD Kingston NV2 1TB',
        cantidad: 1,
        precio_unitario: 289.0,
        descuento: 0,
        subtotal_linea: 289.0
      },
      {
        id_producto: ObjectId('671000000000000000000007'),
        codigo_sku: 'MOU-RAZ-V3',
        nombre: 'Mouse Razer DeathAdder V3',
        cantidad: 1,
        precio_unitario: 249.0,
        descuento: 0,
        subtotal_linea: 249.0
      }
    ]
  }
];

db.proveedores.insertMany(proveedores);
db.productos.insertMany(productos);
db.clientes.insertMany(clientes);
db.ventas.insertMany(ventas);

db.productos.createIndex({ codigo_sku: 1 }, { unique: true });
db.clientes.createIndex({ documento: 1 }, { unique: true });
db.proveedores.createIndex({ ruc: 1 }, { unique: true });
db.productos.createIndex({ categoria: 1 });
db.ventas.createIndex({ id_cliente: 1 });
db.ventas.createIndex({ fecha_venta: -1 });

print('OK: base tienda_computadoras cargada');
print('Colecciones:', db.getCollectionNames());
print('productos:', db.productos.countDocuments());
print('clientes:', db.clientes.countDocuments());
print('proveedores:', db.proveedores.countDocuments());
print('ventas:', db.ventas.countDocuments());
