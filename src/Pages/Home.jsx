import { Outlet } from "react-router-dom";
import Nav from "components/Nav";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

export default function Home() {
    return (
        <Container fluid>
            <Row>
                <Col xs={3} className='nav-col'>
                    <Nav />
                </Col>
                <Col xs={9}>
                    <Outlet className='outlet' prop={"prop..."} />
                </Col>
            </Row>
        </Container>
    );
}
