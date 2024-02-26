import { FirebaseContext } from "../context/FirebaseContext";
import { Table, Col, Stack, Row } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import Search from "../components/Search";
import PaginationComponent from "../components/Pagination";
import { Link } from "react-router-dom";
import DeleteModal from "../components/DeleteModal";
import Sort from "../components/Sort";

export default function ClientsTable() {
    const { clientsData } = useContext(FirebaseContext);
    const [clients, setClients] = useState(clientsData?.clients);
    const [page, setPage] = useState(1);
    const [sort, setSort] = useState("");
    const perPage = 10;

    const onSearch = async (value) => {
        if (value === "") {
            setClients(clientsData.clients);
        }
        setClients([]);
        const q = clientsData.clients.filter((c) =>
            c.name.toLowerCase().startsWith(value.toLowerCase())
        );
        if (q) {
            setClients(q);
            setPage(1);
        }
    };

    const sortFun = (a, b) => {
        if (sort === "a-z") {
            if (a.name < b.name) {
                return -1;
            }
            if (a.name > b.name) {
                return 1;
            }
            return 0;
        } else if (sort === "z-a") {
            if (a.name < b.name) {
                return 1;
            }
            if (a.name > b.name) {
                return -1;
            }
            return 0;
        } else if (sort === "newest" || sort === "oldest") {
            let dateA = a.createdAt.split("/");
            let dateB = b.createdAt.split("/");
            dateA = new Date(`${dateA[1]}/${dateA[0]}/${dateA[2]}`);
            dateB = new Date(`${dateB[1]}/${dateB[0]}/${dateB[2]}`);

            if (sort === "oldest") return dateB - dateA;
            else if (sort === "newest") return dateA - dateB;
        }
    };

    return (
        <Col md={{ offset: 1, span: 7 }} xs={{ span: 9 }} className='mt-4'>
            <Stack gap={3}>
                <Row>
                    <Col md={10} xs={12} className='mb-2'>
                        <Search onSearch={onSearch} />
                    </Col>
                    <Col md={2} xs={6}>
                        <Sort setSort={setSort} />
                    </Col>
                </Row>
                {clients?.length === 0 ? (
                    <p className='alert alert-warning'>
                        There's no clients found.
                    </p>
                ) : (
                    <Table responsive table striped hover variant='dark'>
                        <thead>
                            <tr>
                                <th scope='col'>Code</th>
                                <th scope='col'>Name</th>
                                <th scope='col'>Reg. Number</th>
                                <th scope='col'>Phone</th>
                                <th scope='col'>Address</th>
                                <th scope='col'>New Transaction</th>
                                <th scope='col'>Edit</th>
                                <th scope='col'>Delete</th>
                            </tr>
                        </thead>

                        <tbody>
                            {clients
                                ?.sort(sortFun)
                                ?.slice((page - 1) * perPage, page * perPage)
                                ?.map((c) => (
                                    <tr key={c.code}>
                                        <td>{c?.code}</td>
                                        <td>
                                            <Link
                                                to={`/clientdetails/${c?.id}`}
                                            >
                                                {c?.name}
                                            </Link>
                                        </td>
                                        <td>{c?.reg}</td>
                                        <td>{c?.phone}</td>
                                        <td>{c?.address}</td>
                                        <td>
                                            <Link to={`/transaction/${c?.id}`}>
                                                <i
                                                    className='bi bi-plus-circle-fill btn btn-outline-success'
                                                    variant='danger'
                                                ></i>
                                            </Link>
                                        </td>
                                        <td>
                                            <Link to={`/edit/${c?.id}`}>
                                                <i className='bi bi-pencil-fill btn btn-outline-warning'></i>
                                            </Link>
                                        </td>
                                        <td>
                                            <DeleteModal
                                                id={c.id}
                                                clientName={c.name}
                                            />
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </Table>
                )}
                <PaginationComponent
                    page={page}
                    setPage={setPage}
                    numOfPages={Math.ceil(
                        clientsData?.clients?.length / perPage
                    )}
                />
            </Stack>
        </Col>
    );
}
