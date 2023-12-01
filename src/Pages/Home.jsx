import { Outlet } from "react-router-dom";
import Nav from "components/Nav/Nav";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { useContext } from "react";
import { PrintContext } from "context/PrintContext";

export default function Home() {
    const { printMode, setPrint } = useContext(PrintContext);
    return (
        <Container fluid>
            <Row>
                {!printMode && (
                    <Col xs={4} sm={3} className='m-0 p-0'>
                        <Nav />
                    </Col>
                )}
                <Col
                    s={{ offset: 1, span: printMode ? 12 : 8 }}
                    xs={{ offset: 1, span: printMode ? 12 : 7 }}
                >
                    {printMode && (
                        <h2>
                            <i
                                class='bi bi-arrow-left-circle'
                                onClick={() => setPrint(false)}
                            ></i>{" "}
                        </h2>
                    )}
                    <Outlet className='outlet' />
                </Col>
            </Row>
        </Container>
    );
}
