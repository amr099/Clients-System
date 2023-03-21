import { Outlet } from "react-router-dom";
import Nav from "components/Nav";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function Home() {
    return (
        <Row>
            <Col xs={3} className='nav-col'>
                <Nav />
            </Col>
            <Col xs={9}>
                <Outlet className='outlet' />
            </Col>
        </Row>
    );
}
