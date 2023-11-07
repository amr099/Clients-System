import React, { createContext } from "react";
import { db } from "firebase-config";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { collection } from "firebase/firestore";

export const FirebaseContext = createContext();

export const FirebaseContextProvider = ({ children }) => {
    const ClientsCol = collection(db, "Clients");
    const [clients, cLoading, cError, cSnapshot] =
        useCollectionData(ClientsCol);
    clients?.sort(function (a, b) {
        return a.name.localeCompare(b.name, ["en"]);
    });

    const clientsData = {
        clients: clients,
        loading: cLoading,
        error: cError,
        snapshot: cSnapshot,
    };

    const ServicesCol = collection(db, "Services");
    const [services, sLoading, sError, sSnapshot] =
        useCollectionData(ServicesCol);
    services?.sort(function (a, b) {
        return a.name.localeCompare(b.name, ["en"]);
    });

    const servicesData = {
        services: services,
        loading: sLoading,
        error: sError,
        snapshot: sSnapshot,
    };

    const ExpensesCol = collection(db, "Expenses");
    const [expenses, eLoading, eError, eSnapshot] =
        useCollectionData(ExpensesCol);
    expenses?.sort(function (a, b) {
        return a.name.localeCompare(b.name, ["en"]);
    });

    const expensesData = {
        expenses: expenses,
        loading: eLoading,
        error: eError,
        snapshot: eSnapshot,
    };

    return (
        <FirebaseContext.Provider
            value={{ clientsData, expensesData, servicesData }}
        >
            {children}
        </FirebaseContext.Provider>
    );
};
