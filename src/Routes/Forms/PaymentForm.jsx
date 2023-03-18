import React, { useState } from "react";
import { updateDoc, doc, arrayUnion } from "firebase/firestore";
import { db } from "firebase-config";
import CustomForm from "components/CustomForm";

export default function PaymentForm() {
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const inputs = ["selectClient", "payment", "dateAndComment"];

    const onSubmit = async (e) => {
        setSuccess(false);
        setLoading(true);
        e.preventDefault();
        let name = e.target[0].value;
        let payment = e.target[1].value;
        let comment = e.target[2].value;
        let d = new Date(e.target[3].value);
        let date = `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;

        let newPayment = {
            payment: payment,
            comment: comment,
            date: date,
            amount: 0 - payment,
        };

        try {
            let clientRef = await doc(db, "Clients", name);

            await updateDoc(clientRef, {
                transaction: arrayUnion(newPayment),
                amount: 0 - payment,
            });
            setSuccess(true);
            setError(false);
            setLoading(false);
            e.target.reset();
        } catch (e) {
            if (
                e.message ===
                "No document to update: projects/clients-management-system/databases/(default)/documents/Clients/sada"
            ) {
                setError("لا يوجد ملف بهذا الاسم");

                setLoading(false);
                setSuccess(false);
            } else {
                console.log(e.message);
                console.log("error adding new client.");
                setError(" خطأ");
                setLoading(false);
                setSuccess(false);
            }
        }
    };
    return (
        <CustomForm
            label={"New Payment"}
            onSubmit={onSubmit}
            error={error}
            loading={loading}
            success={success}
            inputs={inputs}
        />
    );
}
