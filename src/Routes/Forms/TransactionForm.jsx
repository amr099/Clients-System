import React, { useReducer } from "react";
import { db } from "firebase-config";
import { updateDoc, doc, arrayUnion } from "firebase/firestore";
import CustomForm from "components/CustomForm";
import { reducer } from "./reducer";

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
            dispatch({
                type: "ERROR",
                payload: `Error adding new transaction: ${e.message}`,
            });
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
