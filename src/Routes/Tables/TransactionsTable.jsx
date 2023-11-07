import React, { useState, useEffect } from "react";
import { arrayRemove, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "firebase-config";
import CustomTable from "components/CustomTable";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

export default function TransactionsTable() {
  const [name, setName] = useState("");
  const [transactions, setTransactions] = useState([]);
  let finalAmount = 0;

  const onDelete = async (t) => {
    const res = window.confirm(
      "Are you sure aboue deleting this transaction ?"
    );
    if (res) {
      try {
        const ClientDoc = doc(db, "Clients", name);
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

  const table = name && (
    <Table responsive striped hover>
      <thead>
        <tr>
          <th scope="col">Date</th>
          <th scope="col">Service</th>
          <th scope="col">Cost</th>
          <th scope="col">Payment</th>
          <th scope="col">Balance</th>
          <th scope="col">Comment</th>
        </tr>
      </thead>
      <tbody>
        {transactions?.map((t, index) => (
          <tr key={index}>
            <td>{t.date}</td>
            <td>{t.service}</td>
            <td>{t.cost || 0}</td>
            <td>{t.payment || 0}</td>
            <td>{(finalAmount += t.cost - t.payment)}</td>
            <td>{t.comment}</td>
            <td>
              <Button variant="danger" onClick={() => onDelete(t)}>
                <i className="bi bi-trash"></i>
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );

  const sortbyDate = (a, b) => {
    let dateA = a.date.split("/");
    let dateB = b.date.split("/");
    dateA = new Date(`${dateA[1]}/${dateA[0]}/${dateA[2]}`);
    dateB = new Date(`${dateB[1]}/${dateB[0]}/${dateB[2]}`);
    return dateA - dateB;
  };

  useEffect(() => {
    const getTransactions = () => {
      if (name) {
        onSnapshot(doc(db, "Clients", name), (doc) => {
          let sortedTransactions = doc?.data()?.transaction.sort(sortbyDate);
          setTransactions(sortedTransactions);
        });
      }
    };
    getTransactions();
  }, [name]);

  return (
    <CustomTable setName={setName} table={table} label="Client Transactions" />
  );
}
