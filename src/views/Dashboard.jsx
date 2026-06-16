<<<<<<< HEAD
import { Container } from "react-bootstrap";

const Dashboard = () => {
  return (
    <Container className="vista-contenedor">
      <header className="vista-encabezado mb-3">
        <div className="vista-encabezado__titulo-grupo">
          <div className="vista-encabezado__icono" aria-hidden="true">
            <i className="bi bi-graph-up"></i>
          </div>
          <div>
            <h2>Dashboard Power BI</h2>
            <p className="vista-encabezado__subtitulo">
              Reportes y análisis avanzados
            </p>
          </div>
        </div>
      </header>
      <div className="dashboard-embed" style={{ height: "min(75vh, 720px)" }}>
        <iframe
          title="estadisticas"
          width="100%"
          height="100%"
          src="https://app.powerbi.com/view?r=eyJrIjoiMzVkY2NlNmEtMzMzMS00MTVkLTkyNjUtZWJmZjY0NTQ5ODAwIiwidCI6ImU0NzY0NmZlLWRhMjctNDUxOC04NDM2LTVmOGIxNThiYTEyNyIsImMiOjR9"
          allowFullScreen
        ></iframe>
      </div>
    </Container>
  );
};

export default Dashboard;
=======
import { Container, Card} from "react-bootstrap";

const Dashboard =() => {
return (
  <Container>
    <br />
    <Card style={{height: 600}}>
      <iframe
      title="estadisticas"
      width="100%"
      height="100%"
      src="https://app.powerbi.com/view?r=eyJrIjoiZmI0ODZiMjYtMmE1NC00MTYyLWFlM2UtNWRlNTUwYjljNmViIiwidCI6ImU0NzY0NmZlLWRhMjctNDUxOC04NDM2LTVmOGIxNThiYTEyNyIsImMiOjR9"
      allowfullScreen="true">
        </iframe>
    </Card>
  </Container>

);

};

export default Dashboard;
>>>>>>> ec2a97295fc5201f05148feda443b310b223b0fe
