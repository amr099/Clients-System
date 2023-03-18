import React, { useContext, useState } from "react";
import { doc, onSnapshot, deleteDoc } from "firebase/firestore";
import { FirebaseContext } from "context/FirebaseContext";
import { db } from "firebase-config";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function CustomTable({ setName, table }) {
    const { clients } = useContext(FirebaseContext);
    const [clientData, setClientData] = useState();

    const onChange = async (name) => {
        await onSnapshot(doc(db, "Clients", name), (doc) => {
            setName(name);
            setClientData(doc.data());
        });
    };

    const onDelete = async (client) => {
        const res = window.confirm(
            `Are you sure about deleting Client: ${client} ? `
        );
        if (res) {
            deleteDoc(doc(db, "Clients", client));
        } else {
            return;
        }
    };

    return (
        <div className='d-flex flex-column col mx-auto w-75 pt-4 custom-table'>
            <Form.Select
                className='mb-4'
                onChange={(e) => onChange(e.target.value)}
            >
                {clients?.map((c) => (
                    <option key={c.name} value={c.name}>
                        {c.name}
                    </option>
                ))}
            </Form.Select>
            <Table striped hover variant='dark'>
                <thead>
                    <tr>
                        <th scope='col'>Code</th>
                        <th scope='col'>Name</th>
                        <th scope='col'>Reg. Code</th>
                        <th scope='col'>Mobile</th>
                        <th scope='col'>Address</th>
                        <th scope='col'>Remove</th>
                    </tr>
                </thead>
                <tbody>
                    <>
                        <tr>
                            <td>{clientData?.code}</td>
                            <td>{clientData?.name}</td>
                            <td>{clientData?.reg}</td>
                            <td>{clientData?.phone}</td>
                            <td>{clientData?.address}</td>
                            <td>
                                <Button
                                    variant='danger'
                                    onClick={() => onDelete(clientData.name)}
                                >
                                    <i className='bi bi-trash'></i>
                                </Button>
                            </td>
                        </tr>
                    </>
                </tbody>
            </Table>
            <hr />
            {table}
        </div>
    );
}
