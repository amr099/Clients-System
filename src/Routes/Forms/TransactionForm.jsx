import React, { useReducer } from "react";
import { db } from "firebase-config";
import { updateDoc, doc, arrayUnion } from "firebase/firestore";
import CustomForm from "components/CustomForm";

const reducer = (state, action) => {
    switch (action.type) {
        case "SUCCESS":
            return { success: true, loading: false, error: "" };
        case "LOADING":
            return { success: false, loading: true, error: "" };
        case "ERROR":
            return { success: false, loading: false, error: action.payload };
    }
};

export default function TransactionForm() {
    const [state, dispatch] = useReducer(reducer, {
        success: false,
        loading: false,
        error: "",
    });
    const inputs = [
        "selectClient",
        "payment",
        "cost",
        "dateAndComment",
        "service",
    ];

    const onSubmit = async (data) => {
        dispatch({ type: "LOADING" });
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
            dispatch({ type: "SUCCESS" });
        } catch (e) {
            if (
                e.message.startsWith(
                    "No document to update: projects/clients-management-system/databases/(default)/documents/Clients"
                )
            ) {
                dispatch({
                    type: "ERROR",
                    payload: "Client's name not found.",
                });
            } else {
                dispatch({
                    type: "ERROR",
                    payload: `Error adding new transaction: ${e.message}`,
                });
            }
        }
    };

    return (
        <CustomForm
            label={"New Transaction"}
            onSubmit={onSubmit}
            state={state}
            inputs={inputs}
        />
    );
}
