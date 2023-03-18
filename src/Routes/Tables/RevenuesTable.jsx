import React, { useState, useEffect } from "react";
import CustomTable from "components/CustomTable";
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "firebase-config";
import Table from "react-bootstrap/Table";

export default function RevenuesTable() {
    const [name, setName] = useState();
    const [revenues, setRevenue] = useState(0);
    const [expenses, setExpenses] = useState(0);
    const table = transactions && (
        <Table responsive striped hover>
            <thead>
                <tr>
                    <th scope='col'>Revenues</th>
                    <th scope='col'>Expenses</th>
                    <th scope='col'>Gross Income</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{revenues || 0}</td>
                    <td>{expenses || 0}</td>
                    <td>{revenues - expenses || 0}</td>
                </tr>
            </tbody>
        </Table>
    );

    useEffect(() => {
        const getRevenues = async () => {
            await onSnapshot(doc(db, "Clients", name), (doc) => {
                setRevenue(0);
                let r = 0;
                doc.data().transaction?.map((t) => (r += Number(t.payment)));
                setRevenue(r);
            });

            await onSnapshot(doc(db, "Expenses", name), (doc) => {
                setExpenses(0);
                let e = 0;
                doc.data().transaction?.map((t) => (e += Number(t.cost)));
                setExpenses(e);
            });
        };
        getRevenues();
    }, [name]);

    return <CustomTable setName={setName} table={table} />;
}
