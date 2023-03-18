import React, { useState } from "react";
import { db } from "firebase-config";
import { updateDoc, doc, arrayUnion } from "firebase/firestore";
import CustomForm from "components/CustomForm";

export default function TransactionForm() {
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const inputs = [
        "selectClient",
        "payment",
        "cost",
        "dateAndComment",
        "service",
    ];

    const onSubmit = async (data) => {
        console.log(data);
        setSuccess(false);
        setLoading(true);
        try {
            let clientRef = doc(db, "Clients", data.clientName);

            await updateDoc(clientRef, {
                transaction: arrayUnion({
                    service: data.service,
                    cost: data.cost,
                    payment: data.payment,
                    comment: data.comment,
                    date: `${new Date(data.date).getDate()}/${
                        new Date(data.date).getMonth() + 1
                    }/${new Date(data.date).getFullYear()}`,
                }),
            });
            setSuccess(true);
            setError(false);
            setLoading(false);
        } catch (e) {
            if (
                e.message.startsWith(
                    "No document to update: projects/clients-management-system/databases/(default)/documents/Clients"
                )
            ) {
                setError("لا يوجد ملف بهذا الاسم");
                setLoading(false);
                setSuccess(false);
            } else {
                console.log(e.message);
                console.log("error adding new client.");
                setError(" خظأ");
                setLoading(false);
                setSuccess(false);
            }
        }
    };

    return (
        <CustomForm
            label={"New Transaction"}
            onSubmit={onSubmit}
            loading={loading}
            success={success}
            error={error}
            inputs={inputs}
        />
    );
}
