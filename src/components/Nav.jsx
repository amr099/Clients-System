import React from "react";
import { Link } from "react-router-dom";
import Backup from "./Backup";
import Stack from "react-bootstrap/Stack";
import Container from "react-bootstrap/Container";

export default function Nav() {
    return (
        <nav>
            <h3>New</h3>
            <Container>
                <Stack gap={3}>
                    <Link to='client'>
                        <i className='bi bi-person-plus'></i>{" "}
                        <span>Client</span>
                    </Link>
                    <Link to='transaction'>
                        <i className='bi bi-stack'></i> <span>Transaction</span>
                    </Link>
                    <Link to='payment'>
                        <i className='bi bi-wallet'></i> <span>Payment</span>
                    </Link>
                    <Link to='expense'>
                        <i className='bi bi-coin'></i> <span>Expense</span>
                    </Link>
                </Stack>
            </Container>
            <hr />
            <h3>View</h3>
            <Container>
                <Stack gap={3}>
                    <Link to='transactions'>
                        <i className='bi bi-card-list'></i>{" "}
                        <span>Transactions</span>
                    </Link>
                    <Link to='expenses'>
                        <i className='bi bi-cash-coin'></i>{" "}
                        <span>Expnenes</span>
                    </Link>
                    {/* <Link to='revenues'>
                        <i className='bi bi-bar-chart'></i>{" "}
                        <span>Revenues</span>
                    </Link> */}
                    <Link to='revenueschart'>
                        <i className='bi bi-bar-chart'></i>{" "}
                        <span>Revenues</span>
                    </Link>
                </Stack>
            </Container>
            <hr />
            <h3>Edit</h3>
            <Container>
                <Stack gap={3}>
                    <Link to='clientinfo'>
                        <i className='bi bi-pencil-square'></i>{" "}
                        <span>Client Info.</span>
                    </Link>
                    <Link to='serviceslist'>
                        <i className='bi bi-file-earmark-text'></i>{" "}
                        <span>Services List</span>
                    </Link>
                    <hr />
                    <Backup />
                </Stack>
            </Container>
        </nav>
    );
}
