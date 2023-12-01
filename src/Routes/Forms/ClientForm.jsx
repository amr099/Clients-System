import React, { useReducer, useContext } from "react";
import { setDoc, doc, arrayUnion } from "firebase/firestore";
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

export default function ClientForm() {
    const [state, dispatch] = useReducer(reducer, {
        success: false,
        loading: false,
        error: "",
    });

    const { clientsData } = useContext(FirebaseContext);

    const inputs = [
        "newClientName",
        "newClient",
        "service",
        "cost",
        "payment",
        "dateAndComment",
    ];

    const onSubmit = async (data) => {
        try {
            dispatch({ type: "LOADING" });
            if (clientsData?.error) {
                dispatch({
                    type: "ERROR",
                    payload: "Can't fetch clients data.",
                });
                return;
            }
            if (!clientsData?.loading) {
                if (
                    clientsData?.clients.find(
                        (c) => c?.name === data?.newClientName
                    )
                ) {
                    dispatch({
                        type: "ERROR",
                        payload: "Name already exists.",
                    });
                    return;
                }
                if (clientsData.clients.find((c) => c.code === data.code)) {
                    dispatch({
                        type: "ERROR",
                        payload: "Code already exists.",
                    });
                    return;
                }
                if (clientsData.clients.find((c) => c.reg === data.reg)) {
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

            let newTransaction = {
                service: data.service,
                cost: data.cost,
                payment: data.payment,
                comment: data.comment,
                date: `${new Date(data.date).getDate()}/${
                    new Date(data.date).getMonth() + 1
                }/${new Date(data.date).getFullYear()}`,
            };

            let clientRef = await doc(db, "Clients", data.newClientName);
            await setDoc(clientRef, {
                transaction: arrayUnion(newTransaction),
                name: data.newClientName,
                code: data.code,
                reg: data.reg,
                address: data.address,
                phone: data.phone,
            });
            dispatch({ type: "SUCCESS" });
        } catch (e) {
            dispatch({
                type: "ERROR",
                payload: setError(`Error adding new client: (${e.message})`),
            });
        }
    };

    return (
        <CustomForm
            label={"New Client"}
            onSubmit={onSubmit}
            state={state}
            inputs={inputs}
        />
    );
}
