import React, { useReducer } from "react";
import { updateDoc, doc, arrayUnion, setDoc } from "firebase/firestore";
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

export default function ExpensesForm() {
    const [state, dispatch] = useReducer(reducer, {
        success: false,
        loading: false,
        error: "",
    });
    const inputs = ["selectClient", "expense", "dateAndComment"];

    const onSubmit = async (data) => {
        dispatch({ type: "LOADING" });
        let newExpense = {
            cost: data.expcost,
            expense: data.expense,
            comment: data.comment,
            date: `${new Date(data.date).getDate()}/${
                new Date(data.date).getMonth() + 1
            }/${new Date(data.date).getFullYear()}`,
        };

        let clientRef = await doc(db, "Expenses", data.clientName);
        try {
            await updateDoc(clientRef, {
                transaction: arrayUnion(newExpense),
            });
            dispatch({ type: "SUCCESS" });
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
                dispatch({ type: "SUCCESS" });
            } else {
                dispatch({
                    type: "ERROR",
                    payload: `Error adding new expenses: ${e.message}`,
                });
            }
        }
    };

    return (
        <CustomForm
            label={"New Expense"}
            onSubmit={onSubmit}
            state={state}
            inputs={inputs}
        />
    );
}
