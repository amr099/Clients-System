import React, { useReducer } from "react";
import { updateDoc, doc, arrayUnion } from "firebase/firestore";
import { db } from "firebase-config";
import CustomForm from "components/CustomForm";
import { reducer } from "./reducer";

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
            dispatch({
                type: "ERROR",
                payload: `Error updating client information: ${e.message}`,
            });
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
