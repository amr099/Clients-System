import React, { useContext, useState, useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { FirebaseContext } from "context/FirebaseContext";
import { db } from "firebase-config";

export default function CustomTable({ setName, transactions, table }) {
    const { clients } = useContext(FirebaseContext);
    const [clientData, setClientData] = useState();

    const onChange = async (name) => {
        await onSnapshot(doc(db, "Clients", name), (doc) => {
            setName(name);
            setClientData(doc.data());
        });
    };

    useEffect(() => {
        console.log(transactions != "undefined");
    });

    return (
        <div className='d-flex flex-column col mx-auto w-75 pt-4 custom-table'>
            <select
                onChange={(e) => onChange(e.target.value)}
                class='form-select'
            >
                <option disabled selected>
                    Select Client
                </option>
                {clients?.map((c) => (
                    <option value={c.name}>{c.name}</option>
                ))}
            </select>
            <table class='table table-dark mt-4'>
                <thead>
                    <tr>
                        <th scope='col'>Code</th>
                        <th scope='col'>Name</th>
                        <th scope='col'>Reg. Code</th>
                        <th scope='col'>Mobile</th>
                        <th scope='col'>Address</th>
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
                        </tr>
                    </>
                </tbody>
            </table>
            {table}
        </div>
    );
}
