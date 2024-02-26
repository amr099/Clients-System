import { Outlet } from "react-router-dom";
import { Row, Col, Stack, Container } from "react-bootstrap/";
import Sidebar from "components/Sidebar/Sidebar";
export default function Home() {
    return (
        <Container fluid>
            <Row>
                <Col className='m-0 p-0' xs={{ span: 3 }}>
                    <Sidebar />
                </Col>
                <Outlet className='outlet' />
            </Row>
        </Container>
    );
}
