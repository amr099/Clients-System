import { Outlet } from "react-router-dom";
import Nav from "components/Nav";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { useContext } from "react";
import { PrintContext } from "context/PrintContext";
import Button from "react-bootstrap/Button";

export default function Home() {
  const { printMode, setPrint } = useContext(PrintContext);
  return (
    <Container fluid>
      <Row>
        {!printMode && (
          <Col xs={3} className="nav-col">
            <Nav />
          </Col>
        )}
        <Col xs={printMode ? 12 : 9}>
          {printMode && (
            <h2>
              <i
                class="bi bi-arrow-left-circle"
                onClick={() => setPrint(false)}
              ></i>{" "}
            </h2>
          )}
          <Outlet className="outlet" />
        </Col>
      </Row>
    </Container>
  );
}
