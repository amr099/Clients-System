import { Outlet } from "react-router-dom";
import Nav from "components/Nav";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

export default function Home() {
    return (
        <Row>
            <Col lg={3} md={4} xs={4} className='nav-col'>
                <Container>
                    <Nav />
                </Container>
            </Col>
            <Col lg={9} md={8} xs={8}>
                <Outlet className='outlet' />
            </Col>
        </Row>
    );
}
