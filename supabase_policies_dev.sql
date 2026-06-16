ALTER TABLE public.categorias ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.productos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.empleados ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clientes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ventas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.detalles_ventas ENABLE ROW LEVEL SECURITY;

CREATE POLICY "dev_select_categorias"
ON public.categorias FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "dev_select_productos"
ON public.productos FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "dev_select_empleados"
ON public.empleados FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "dev_select_clientes"
ON public.clientes FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "dev_select_ventas"
ON public.ventas FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "dev_select_detalles_ventas"
ON public.detalles_ventas FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "dev_write_categorias"
ON public.categorias FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "dev_write_productos"
ON public.productos FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "dev_write_empleados"
ON public.empleados FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "dev_write_clientes"
ON public.clientes FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "dev_write_ventas"
ON public.ventas FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "dev_write_detalles_ventas"
ON public.detalles_ventas FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);
