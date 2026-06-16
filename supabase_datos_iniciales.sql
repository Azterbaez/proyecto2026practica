WITH categorias_insertadas AS (
  INSERT INTO public.categorias (nombre_categoria, descripcion_categoria)
  VALUES
    ('Bebidas', 'Bebidas frias y calientes'),
    ('Comidas', 'Platos principales'),
    ('Postres', 'Dulces y reposteria')
  RETURNING id_categoria, nombre_categoria
),
productos_insertados AS (
  INSERT INTO public.productos (
    nombre_producto,
    descripcion_producto,
    categoria_producto,
    precio_venta,
    url_imagen
  )
  VALUES
    (
      'Cafe americano',
      'Cafe negro tradicional',
      (SELECT id_categoria FROM categorias_insertadas WHERE nombre_categoria = 'Bebidas'),
      45,
      NULL
    ),
    (
      'Jugo natural',
      'Jugo de fruta de temporada',
      (SELECT id_categoria FROM categorias_insertadas WHERE nombre_categoria = 'Bebidas'),
      55,
      NULL
    ),
    (
      'Hamburguesa clasica',
      'Pan, carne, queso y vegetales',
      (SELECT id_categoria FROM categorias_insertadas WHERE nombre_categoria = 'Comidas'),
      160,
      NULL
    ),
    (
      'Torta de chocolate',
      'Porcion individual de torta',
      (SELECT id_categoria FROM categorias_insertadas WHERE nombre_categoria = 'Postres'),
      85,
      NULL
    )
  RETURNING id_producto, nombre_producto, precio_venta
),
empleados_insertados AS (
  INSERT INTO public.empleados (
    nombre_empleado,
    apellido_empleado,
    email,
    celular,
    pin,
    tipo_empleado
  )
  VALUES
    ('Admin', 'Sistema', 'admin@proyecto2026.com', '88880000', '1234', 'admin'),
    ('Mesero', 'Demo', 'mesero@proyecto2026.com', '88881111', '4321', 'mesero')
  RETURNING id_empleado, email
),
clientes_insertados AS (
  INSERT INTO public.clientes (nombre_cliente, apellido_cliente, celular)
  VALUES
    ('Cliente', 'General', '00000000'),
    ('Maria', 'Lopez', '88882222')
  RETURNING id_cliente, celular
),
venta_insertada AS (
  INSERT INTO public.ventas (
    id_cliente,
    id_empleado,
    fecha_venta,
    metodo_pago,
    total
  )
  VALUES (
    (SELECT id_cliente FROM clientes_insertados WHERE celular = '00000000'),
    (SELECT id_empleado FROM empleados_insertados WHERE email = 'admin@proyecto2026.com'),
    NOW(),
    'efectivo',
    205
  )
  RETURNING id_venta
)
INSERT INTO public.detalles_ventas (
  id_venta,
  id_producto,
  cantidad,
  precio_unitario,
  subtotal
)
VALUES
  (
    (SELECT id_venta FROM venta_insertada),
    (SELECT id_producto FROM productos_insertados WHERE nombre_producto = 'Cafe americano'),
    1,
    45,
    45
  ),
  (
    (SELECT id_venta FROM venta_insertada),
    (SELECT id_producto FROM productos_insertados WHERE nombre_producto = 'Hamburguesa clasica'),
    1,
    160,
    160
  );
