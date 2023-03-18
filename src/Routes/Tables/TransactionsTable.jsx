import React, { useState, useEffect, useContext } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "firebase-config";
import CustomTable from "components/CustomTable";
import { FirebaseContext } from "./../../context/FirebaseContext";

export default function TransactionsTable() {
    const [name, setName] = useState();
    const [transactions, setTransactions] = useState();
    let finalAmount = 0;
    const table = (
        <table class='table table-striped'>
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
                {transactions?.map((t) => (
                    <tr>
                        <td>{t.date}</td>
                        <td>{t.service}</td>
                        <td>{t.cost}</td>
                        <td>{t.payment}</td>
                        <td>{(finalAmount += t.payment - t.cost)}</td>
                        <td>{t.comment}</td>
                    </tr>
                ))}
            </tbody>
        </table>
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

    return (
        <CustomTable
            transactions={transactions}
            setName={setName}
            table={table}
        />
    );
}
