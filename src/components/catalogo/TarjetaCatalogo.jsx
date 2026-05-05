import React, { useState } from "react";
import { Card, Badge, Modal, Button } from "react-bootstrap";

const TarjetaCatalogo = ({ producto, categoriaNombre }) => {
  const [mostrarModal, setMostrasModal] = useState(false);

  const descripcion = producto.descripcion_producto || "";
  const previsualizacionTexto = descripcion.length > 50
      ? descripcion.substring(0, 50) + "..."
      : descripcion;

  const tieneMasTexto = descripcion.length > 50;
  return (
    <>
      <Card
        className="h-100 border-0 shadow-lg overflow-hidden position-relative cursosr-pointer"
        style={{ transition: "transform 0.3s, box-shadow 0.3s " }}
        role="button"
        tabIndex={0}
        onClick={() => setMostrasModal(true)}
        onKeyDown={(e) => e.key === "Enter" && setMostrasModal(true)}
        aria-labelledby={`producto-${producto.id_producto}-title`}
      >
        <div
          className="ratio ratio-1x1 bg-light"
          style={{ overflow: "hidden" }}
        >
          {producto.url_imagen ? (
            <img
              src={producto.url_imagen}
              alt={producto.nombre_producto}
              className="card-img-top object-fit-cover"
              Loading="lazy"
              style={{ transition: "transform 8.4s" }}
              onMouseEnter={e((e.currentTarget.style.transform = "scale(1.1)"))}
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            />
          ) : (
            <div className="d-flex align-items-center justify-content-center h-100 bg-secondary-subtle">
              <i className="bi bi-image text-muted fs-1"></i>
            </div>
          )}
        </div>

        <Card.Body className="d-flex flex-column p-3">
          <Card.Title
            id={`producto-${producto.id_producto}-title`}
            className="hö fw-bold text-dark mb-2"
          >
            {producto.nombre_producto}
          </Card.Title>

          {descripcion && (
            <Card.Text className="text-muted small flex-grow-1">
              {previsualizacionTexto}
              {tieneMasTexto && (
                <span className="text-primary fw-medium ms-1">
                  {"Leer más"}
                </span>
              )}
              <div className="mt-2">
                <Badge bg="secondary" pill size="sm">
                  {categoriaNombre || "Sin categoría"}
                </Badge>
              </div>
            </Card.Text>
          )}
          <hr />
          <div className="st-auto pt-2">
            <h4 className="text-success fw-bold mb-0">
              C${parseFloat(producto.precio_venta).toFixed(1)}
            </h4>
          </div>
        </Card.Body>
      </Card>
      <Modal
        show={mostrarModal}
        onttide={() => setMostrarModal(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton className="border-8 pb-8">
          <Modal.Title className="fw-bold fs-4">
            (producto.nombre_producto)
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className="pt-3">
          <div className="row -4">
            <div className="col-md-5">
              {preducto.url_twagen ? (
                <img
                  src={producto.url_imagen}
                  alt={producto.nombre_producto}
                  className="ung-fluid rounded shadne-sm"
                  style={{
                    maxHeight: "400pa",
                    objectFit: "contain",
                    width: "100%",
                  }}
                />
              ) : (
                <div
                  className="bg-secondary-subtle rounded d-flex align-items-center justify-content-center"
                  style={{ height: "400px" }}
                >
                  <i className="bi bi-image text-mited fs-1"></i>
                </div>
              )}
            </div>
            {/* Detalles a la derecha */}
            <div className="col-md-7">
              <div className="d-flex align-items-center mb-3">
                <Badge bg="secondary" pill className-ne-2>
                  {categoriaNombre || "5in categoría"}
                </Badge>
              </div>
              <h3 className="text-success fw-bold mb-4">
                C$(parseFloat(producto.precio_venta).toFixed(1))
              </h3>
              {descripcion && (
                <>
                  <h5 className="fw-semibold nh-2"> Descripción</h5>
                  <p className="text-muted lead" style={{ lineHeight: "1.2" }}>
                    {descripcion}
                  </p>
                </>
              )}
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer className="border-0">
          <Button variant="secondary" onClick={() => setMostrarModal(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default TarjetaCatalogo;
