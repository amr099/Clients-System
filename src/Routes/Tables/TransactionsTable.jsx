import React, { useState, useEffect, useContext } from "react";
import { arrayRemove, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "firebase-config";
import CustomTable from "components/CustomTable";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

export default function TransactionsTable() {
    const [name, setName] = useState();
    const [transactions, setTransactions] = useState();
    const onDelete = async (date, service, cost, payment, comment) => {
        const res = window.confirm(
            "Are you sure aboue deleting this transaction ?"
        );
        if (res) {
            try {
                const ClientDoc = doc(db, "Clients", name);
                updateDoc(ClientDoc, {
                    transaction: arrayRemove({
                        date: date,
                        service: service,
                        cost: cost,
                        payment: payment,
                        comment: comment,
                    }),
                });
            } catch (e) {
                console.log(e);
            }
        } else {
            return;
        }
        console.log("deleted");
    };

    let finalAmount = 0;
    const table = transactions && (
        <Table responsive striped hover>
            <thead>
                <tr>
                    <th scope='col'>Date</th>
                    <th scope='col'>Service</th>
                    <th scope='col'>Cost</th>
                    <th scope='col'>Payment</th>
                    <th scope='col'>Balance</th>
                    <th scope='col'>Comment</th>
                </tr>
            </thead>
            <tbody>
                {transactions?.map((t, index) => (
                    <tr key={index}>
                        <td>{t.date}</td>
                        <td>{t.service}</td>
                        <td>{t.cost || 0}</td>
                        <td>{t.payment || 0}</td>
                        <td>
                            {(finalAmount += isNaN(t.payment - t.cost))
                                ? 0
                                : t.payment - t.cost}
                        </td>
                        <td>{t.comment}</td>
                        <td>
                            <Button
                                variant='danger'
                                onClick={() =>
                                    onDelete(
                                        t.date,
                                        t.service,
                                        t.cost,
                                        t.payment,
                                        t.comment
                                    )
                                }
                            >
                                <i className='bi bi-trash'></i>
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );

    useEffect(() => {
        const getTransactions = async () => {
            await onSnapshot(doc(db, "Clients", name), (doc) => {
                let sortedTransactions = doc
                    .data()
                    ?.transaction.sort((a, b) => {
                        let dateA = a.date.split("/");
                        let dateB = b.date.split("/");
                        dateA = new Date(`${dateA[1]}/${dateA[0]}/${dateA[2]}`);
                        dateB = new Date(`${dateB[1]}/${dateB[0]}/${dateB[2]}`);

                        return dateA - dateB;
                    });
                setTransactions(sortedTransactions);
            });
        };
        getTransactions();
    }, [name]);

    return <CustomTable setName={setName} table={table} />;
}
