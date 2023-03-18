import React, { useState } from "react";
import { updateDoc, doc, arrayUnion } from "firebase/firestore";
import { db } from "firebase-config";
import CustomForm from "components/CustomForm";

export default function PaymentForm(data) {
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const inputs = ["selectClient", "payment", "dateAndComment"];

    const onSubmit = async (data) => {
        setSuccess(false);
        setLoading(true);

        let newPayment = {
            cost: 0,
            payment: data.payment,
            comment: data.comment,
            date: `${new Date(data.date).getDate()}/${
                new Date(data.date).getMonth() + 1
            }/${new Date(data.date).getFullYear()}`,
        };

        try {
            let clientRef = await doc(db, "Clients", data.clientName);

            await updateDoc(clientRef, {
                transaction: arrayUnion(newPayment),
            });
            setSuccess(true);
            setError(false);
            setLoading(false);
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
