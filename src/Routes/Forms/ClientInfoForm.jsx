import React, { useReducer, useContext } from "react";
import { updateDoc, doc } from "firebase/firestore";
import { FirebaseContext } from "context/FirebaseContext";
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

export default function ClientInfoForm() {
    const [state, dispatch] = useReducer(reducer, {
        success: false,
        loading: false,
        error: "",
    });
    const { clientsData } = useContext(FirebaseContext);

    const inputs = ["selectClient", "newClient"];

    const onSubmit = async (data) => {
        dispatch({ type: "LOADING" });
        if (clientsData.error) {
            dispatch({
                type: "ERROR",
                payload: "Can't fetch clients data.",
            });
            return;
        }
        if (!clientsData.loading) {
            if (clientsData?.clients.find((c) => c.code === data.code)) {
                dispatch({ type: "ERROR", payload: "Code already exists." });
                return;
            }
            if (clientsData?.clients.find((c) => c.reg === data.reg)) {
                dispatch({
                    type: "ERROR",
                    payload: "Registeration number already exists.",
                });
                return;
            }
        } else {
            dispatch({
                type: "ERROR",
                payload: "Can't fetch clients data.",
            });
            return;
        }

        try {
            let clientDoc = doc(db, "Clients", data.clientName);

            if (data.code) await updateDoc(clientDoc, { code: data.code });
            if (data.reg) await updateDoc(clientDoc, { reg: data.reg });
            if (data.phone) await updateDoc(clientDoc, { phone: data.phone });
            if (data.address)
                await updateDoc(clientDoc, { address: data.address });
            dispatch({ type: "SUCCESS" });
        } catch (e) {
            if (
                e.message ===
                "No document to update: projects/clients-mangement-system/databases/(default)/documents/Clients/sada"
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
            label={"Edit Client's Information"}
            onSubmit={onSubmit}
            state={state}
            inputs={inputs}
        />
    );
}
