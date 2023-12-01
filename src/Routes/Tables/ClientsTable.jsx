import { db } from "firebase-config";
import { deleteDoc, doc } from "firebase/firestore";
import { FirebaseContext } from "./../../context/FirebaseContext";
import Table from "react-bootstrap/Table";
import { useContext } from "react";
export default function ClientsTable() {
    const { clientsData } = useContext(FirebaseContext);
    const onDelete = async (name) => {
        let response = window.confirm(
            "هل انت متأكد من حذف العميل " + name + "?"
        );
        if (response) {
            try {
                await deleteDoc(doc(db, "Clients", name));
                await deleteDoc(doc(db, "Expenses", name));
            } catch (e) {
                console.log(e.message);
            }
        }
    };

    return (
        <Table responsive table striped hover variant='dark'>
            <thead>
                <tr>
                    <th scope='col'>Code</th>
                    <th scope='col'>Name</th>
                    <th scope='col'>Reg. Number</th>
                    <th scope='col'>Phone</th>
                    <th scope='col'>Address</th>
                    <th scope='col'>Delete</th>
                </tr>
            </thead>
            <tbody>
                {clientsData?.clients?.map((c) => (
                    <tr>
                        <td>{c?.code}</td>
                        <td>{c?.name}</td>
                        <td>{c?.reg}</td>
                        <td>{c?.phone}</td>
                        <td>{c?.address}</td>
                        <td>
                            {" "}
                            <button
                                className='btn btn-outline-danger'
                                onClick={() => onDelete(c?.name)}
                            >
                                <i class='bi bi-trash-fill'></i>
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}
