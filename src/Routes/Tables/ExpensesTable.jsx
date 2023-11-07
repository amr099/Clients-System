import React, { useState, useEffect } from "react";
import { doc, onSnapshot, updateDoc, arrayRemove } from "firebase/firestore";
import { db } from "firebase-config";
import CustomTable from "components/CustomTable";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

export default function ExpensesTable() {
  const [name, setName] = useState();
  const [transactions, setTransactions] = useState([]);

  const onDelete = async (t) => {
    const res = window.confirm(
      "Are you sure aboue deleting this transaction ?"
    );
    if (res) {
      try {
        const ClientDoc = doc(db, "Expenses", name);
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
    return dateA - dateB;
  };

  useEffect(() => {
    const getExpenses = () => {
      if (name) {
        onSnapshot(doc(db, "Expenses", name), (doc) => {
          console.log(doc);
          let sortedTransactions = doc?.data()?.transaction.sort(sortbyDate);
          setTransactions(sortedTransactions);
        });
      }
    };
    getExpenses();
  }, [name]);

  const table = name && (
    <Table responsive striped hover>
      <thead>
        <tr>
          <th scope="col">Date</th>
          <th scope="col">Expense</th>
          <th scope="col">Cost</th>
          <th scope="col">Comment</th>
        </tr>
      </thead>
      <tbody>
        {transactions?.map((t) => (
          <tr>
            <td>{t.date}</td>
            <td>{t.expense}</td>
            <td>{t.cost || 0}</td>
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

  return (
    <>
      <CustomTable setName={setName} table={table} label="Client Expenses" />
    </>
  );
}
