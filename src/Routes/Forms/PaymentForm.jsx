import React, { useReducer } from "react";
import { updateDoc, doc, arrayUnion } from "firebase/firestore";
import { db } from "firebase-config";
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

export default function PaymentForm() {
    const [state, dispatch] = useReducer(reducer, {
        success: false,
        loading: false,
        error: "",
    });
    const inputs = ["selectClient", "payment", "dateAndComment"];
    const onSubmit = async (data) => {
        dispatch({ type: "LOADING" });

        let newPayment = {
            service: "",
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
            dispatch({ type: "SUCCESS" });
        } catch (e) {
            if (
                e.message ===
                "No document to update: projects/clients-management-system/databases/(default)/documents/Clients/sada"
            ) {
                dispatch({
                    type: "ERROR",
                    payload: "Client's name not found.",
                });
            } else {
                dispatch({
                    type: "ERROR",
                    payload: `Error updating client information: ${e.message}`,
                });
            }
        }
    };
    return (
        <CustomForm
            label={"New Payment"}
            onSubmit={onSubmit}
            state={state}
            inputs={inputs}
        />
    );
}
