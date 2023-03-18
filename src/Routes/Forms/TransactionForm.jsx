import React, { useState } from "react";
import { db } from "firebase-config";
import { updateDoc, doc, arrayUnion } from "firebase/firestore";
import CustomForm from "components/CustomForm";

export default function TransactionForm() {
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const inputs = ["selectClient", "payment", "cost", "dateAndComment"];

    const onSubmit = async (e) => {
        setSuccess(false);
        setLoading(true);
        e.preventDefault();
        let name = e.target[0].value;
        let service = e.target[1].value;
        let cost = e.target[2].value;
        let payment = e.target[3].value;
        let comment = e.target[4].value;
        let d = new Date(e.target[5].value);
        let date = `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;

        try {
            let clientRef = doc(db, "Clients", name);

            await updateDoc(clientRef, {
                transaction: arrayUnion({
                    service: service,
                    cost: cost,
                    payment: payment,
                    amount: cost - payment,
                    date: date,
                    comment: comment,
                }),
            });
            setSuccess(true);
            setError(false);
            setLoading(false);
            e.target.reset();
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
