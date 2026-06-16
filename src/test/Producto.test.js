import { render, screen, fireEvent } from "@testing-library/react";
import Productos from "../pages/Productos";

test("Registrar producto correctamente", async () => {
  render(<Productos />);

  fireEvent.click(
    screen.getByText(/Nuevo Producto/i)
  );

  fireEvent.change(
    screen.getByLabelText(/Nombre/i),
    {
      target: {
        value: "Coca Cola"
      }
    }
  );

  fireEvent.change(
    screen.getByLabelText(/Precio/i),
    {
      target: {
        value: "40"
      }
    }
  );

  fireEvent.change(
    screen.getByLabelText(/Categoría/i),
    {
      target: {
        value: "Bebidas"
      }
    }
  );

  const archivo = new File(
    ["imagen"],
    "cocacola.png",
    { type: "image/png" }
  );

  fireEvent.change(
    screen.getByLabelText(/Imagen/i),
    {
      target: {
        files: [archivo]
      }
    }
  );

  fireEvent.click(
    screen.getByText(/Guardar/i)
  );

  expect(
    screen.getByText(
      /Producto registrado correctamente/i
    )
  ).toBeInTheDocument();
});

test("No permite registrar producto sin nombre", async () => {

  render(<Productos />);

  fireEvent.click(
    screen.getByText(/Nuevo Producto/i)
  );

  fireEvent.change(
    screen.getByLabelText(/Precio/i),
    {
      target: { value: "40" }
    }
  );

  fireEvent.click(
    screen.getByText(/Guardar/i)
  );

  expect(
    screen.getByText(
      /Completa los campos obligatorios/i
    )
  ).toBeInTheDocument();

});

test("No permite registrar producto sin imagen", async () => {

  render(<Productos />);

  fireEvent.click(
    screen.getByText(/Nuevo Producto/i)
  );

  fireEvent.change(
    screen.getByLabelText(/Nombre/i),
    {
      target: {
        value: "Coca Cola"
      }
    }
  );

  fireEvent.change(
    screen.getByLabelText(/Precio/i),
    {
      target: {
        value: "40"
      }
    }
  );

  fireEvent.click(
    screen.getByText(/Guardar/i)
  );

  expect(
    screen.getByText(
      /Completa los campos obligatorios/i
    )
  ).toBeInTheDocument();

});