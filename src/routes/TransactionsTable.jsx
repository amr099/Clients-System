import React, { useState, useEffect } from "react";
import { arrayRemove, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "firebase-config";
import Table from "react-bootstrap/Table";
import { useParams } from "react-router";
import { Alert, Col } from "react-bootstrap";
import PaginationComponent from "./../components/Pagination";
import { Link } from "react-router-dom";
import DeleteModal from "./../components/DeleteModal";

export default function TransactionsTable() {
    const [sort, setSort] = useState("");
    const { id } = useParams();
    const [data, setData] = useState({});
    const [page, setPage] = useState(1);
    const perPage = 10;
    let finalAmount = 0;

    useEffect(() => {
        onSnapshot(doc(db, "Clients", id), (doc) => {
            setData(doc.data());
        });
    }, []);

    const onDelete = async (t) => {
        const res = window.confirm(
            "Are you sure aboue deleting this transaction ?"
        );
        if (res) {
            try {
                const ClientDoc = doc(db, "Clients", id);
                updateDoc(ClientDoc, {
                    transaction: arrayRemove(t),
                });
            } catch (e) {
                console.log(e);
            }
        } else {
            return;
        }
    };

    const sortbyDate = (a, b) => {
        let dateA = a.date.split("/");
        let dateB = b.date.split("/");
        dateA = new Date(`${dateA[1]}/${dateA[0]}/${dateA[2]}`);
        dateB = new Date(`${dateB[1]}/${dateB[0]}/${dateB[2]}`);
        if (sort === "asc") {
            return dateA - dateB;
        } else if (sort === "des") {
            return dateB - dateA;
        }
    };

    return (
        <>
            <Col md={{ offset: 1, span: 7 }} xs={{ span: 9 }} className='mt-4'>
                <Table responsive striped hover variant='dark'>
                    <thead>
                        <tr>
                            <th scope='col'>Code</th>
                            <th scope='col'>Name</th>
                            <th scope='col'>Reg. Code</th>
                            <th scope='col'>Mobile</th>
                            <th scope='col'>Address</th>
                            <th scope='col'>New Transaction</th>
                            <th scope='col'>Edit</th>
                            <th scope='col'>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        <>
                            <tr>
                                <td>{data?.code}</td>
                                <td>{data?.name}</td>
                                <td>{data?.reg}</td>
                                <td>{data?.phone}</td>
                                <td>{data?.address}</td>
                                <td>
                                    <Link to={`/transaction/${id}`}>
                                        <i
                                            className='bi bi-plus-circle-fill btn btn-outline-success'
                                            variant='danger'
                                        ></i>
                                    </Link>
                                </td>
                                <td>
                                    <Link to={`/edit/${id}`}>
                                        <i className='bi bi-pencil-fill btn btn-outline-warning'></i>
                                    </Link>
                                </td>
                                <td>
                                    <DeleteModal
                                        clientName={data?.name}
                                        id={id}
                                    />
                                </td>
                            </tr>
                        </>
                    </tbody>
                </Table>
                <hr />
                {data?.transactions?.length === 0 ? (
                    <Alert className='alert alert-warning'>
                        There's no transactions for this client yet.
                    </Alert>
                ) : (
                    <Table responsive striped hover variant='dark'>
                        <thead>
                            <tr>
                                <th scope='col'>Date</th>
                                <th scope='col'>Service</th>
                                <th scope='col'>Cost</th>
                                <th scope='col'>Payment</th>
                                <th scope='col'>Balance</th>
                                <th scope='col'>Comment</th>
                                <th scope='col'>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.transactions
                                ?.sort(sortbyDate)
                                ?.slice((page - 1) * perPage, page * perPage)
                                ?.map((t, index) => (
                                    <tr key={index}>
                                        <td>{t.date}</td>
                                        <td>{t.service}</td>
                                        <td>{t.cost || 0}</td>
                                        <td>{t.payment || 0}</td>
                                        <td>
                                            {
                                                (finalAmount +=
                                                    t.cost - t.payment)
                                            }
                                        </td>
                                        <td>{t.comment}</td>
                                        <td>
                                            <i
                                                className='bi bi-trash btn btn-danger'
                                                onClick={() => onDelete(t)}
                                            ></i>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </Table>
                )}
                {data?.transactions && (
                    <PaginationComponent
                        page={page}
                        setPage={setPage}
                        numOfPages={Math.ceil(
                            data.transactions?.length / perPage
                        )}
                    />
                )}
            </Col>
        </>
    );
}
