import React, { useState } from "react";
import { updateDoc, doc, arrayUnion, setDoc } from "firebase/firestore";
import { db } from "firebase-config";
import CustomForm from "components/CustomForm";

export default function ExpensesForm() {
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const onSubmit = async (e) => {
        setSuccess(false);
        setLoading(true);
        e.preventDefault();
        let name = e.target[0].value;
        let cost = e.target[1].value;
        let expense = e.target[2].value;
        let comment = e.target[4].value;
        let d = new Date(e.target[3].value);
        let date = `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;

        let newExpense = {
            cost: cost,
            expense: expense,
            comment: comment,
            date: date,
        };

        let clientRef = await doc(db, "Expenses", name);
        try {
            await updateDoc(clientRef, {
                transaction: arrayUnion(newExpense),
            });
            setSuccess(true);
            setLoading(false);
            setError(false);
            e.target.reset();
        } catch (e) {
            if (
                e.message.startsWith(
                    "No document to update: projects/clients-mangement-system/databases/(default)/documents/Expenses/"
                )
            ) {
                await setDoc(clientRef, {
                    name: name,
                    transaction: arrayUnion(newExpense),
                });
                setSuccess(true);
                setLoading(false);
                setError(false);
                e.target.reset();
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
            setError={setError}
            setLoading={setLoading}
            setSuccess={setSuccess}
            error={error}
            loading={loading}
            success={success}
            selectClient={true}
            expense={true}
            dateAndComment={true}
        />
    );
}
