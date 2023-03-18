import React, { useState } from "react";
import { updateDoc, doc, arrayUnion, setDoc } from "firebase/firestore";
import { db } from "firebase-config";
import CustomForm from "components/CustomForm";

export default function ExpensesForm() {
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const inputs = ["selectClient", "expense", "dateAndComment"];

    const onSubmit = async (data) => {
        setSuccess(false);
        setLoading(true);
        let newExpense = {
            cost: data.expcost,
            expense: data.expense,
            comment: data.comment,
            date: data.date,
        };

        let clientRef = await doc(db, "Expenses", data.clientName);
        try {
            await updateDoc(clientRef, {
                transaction: arrayUnion(newExpense),
            });
            setSuccess(true);
            setLoading(false);
            setError(false);
        } catch (e) {
            if (
                e.message.startsWith(
                    "No document to update: projects/clients-mangement-system/databases/(default)/documents/Expenses/"
                )
            ) {
                await setDoc(clientRef, {
                    name: data.clientName,
                    transaction: arrayUnion(newExpense),
                });
                setSuccess(true);
                setLoading(false);
                setError(false);
            } else {
                console.log(e.message);
                console.log("error adding new Client Expenses.");
                setError(" خطأ");
                setLoading(false);
                setSuccess(false);
            }
        }
    };

    return (
        <CustomForm
            label={"New Expense"}
            onSubmit={onSubmit}
            error={error}
            loading={loading}
            success={success}
            inputs={inputs}
        />
    );
}
