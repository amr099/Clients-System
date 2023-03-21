import { Outlet } from "react-router-dom";
import Nav from "components/Nav";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function Home() {
    return (
        <Row>
            <Col xl={3} xs={4} className='nav-col'>
                <Nav />
            </Col>
            <Col xl={9} xs={8}>
                <Outlet className='outlet' />
            </Col>
        </Row>
    );
}
