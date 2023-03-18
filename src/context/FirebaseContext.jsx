import React, { createContext } from "react";
import { db } from "firebase-config";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { collection } from "firebase/firestore";

export const FirebaseContext = createContext();

export const FirebaseContextProvider = ({ children }) => {
    const ClientsCol = collection(db, "Clients");
    const [clients, loading, error, snapshot] = useCollectionData(ClientsCol);
    clients?.sort(function (a, b) {
        return a.name.localeCompare(b.name, ["en"]);
    });

    const ServicesCol = collection(db, "Services");
    const [services, sloading, serror, ssnapshot] =
        useCollectionData(ServicesCol);
    services?.sort(function (a, b) {
        return a.name.localeCompare(b.name, ["en"]);
    });

    const ExpensesCol = collection(db, "Expenses");
    const [expenses, expensesLodings, expensesError, expensesSnapshot] =
        useCollectionData(ExpensesCol);
    expenses?.sort(function (a, b) {
        return a.name.localeCompare(b.name, ["en"]);
    });

    return (
        <FirebaseContext.Provider value={{ clients, expenses, services }}>
            {children}
        </FirebaseContext.Provider>
    );
};
