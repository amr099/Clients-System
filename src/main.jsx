import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./index.css";
import React from "react";
import ReactDOM from "react-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { FirebaseContextProvider } from "./context/FirebaseContext";
import { PrintContextProvider } from "context/PrintContext";
import Home from "./Pages/Home";
import ClientForm from "./Routes/Forms/ClientForm";
import TransactionForm from "./Routes/Forms/TransactionForm";
import PaymentForm from "./Routes/Forms/PaymentForm";
import ExpensesForm from "./Routes/Forms/ExpensesForm";
import ServicesList from "./Routes/Forms/ServicesList";
import TransactionsTable from "./Routes/Tables/TransactionsTable";
import ExpensesTable from "Routes/Tables/ExpensesTable";
import Overview from "./Routes/Overview/Overview";
import ClientInfoForm from "./Routes/Forms/ClientInfoForm";
import ErrorPage from "components/ErrorPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <Overview />,
            },
            {
                path: "/client",
                element: <ClientForm />,
            },
            {
                path: "/transaction",
                element: <TransactionForm />,
            },
            {
                path: "/payment",
                element: <PaymentForm />,
            },
            {
                path: "/expense",
                element: <ExpensesForm />,
            },
            {
                path: "/transactions",
                element: <TransactionsTable />,
            },
            {
                path: "/expenses",
                element: <ExpensesTable />,
            },
            {
                path: "/client info",
                element: <ClientInfoForm />,
            },
            {
                path: "/services list",
                element: <ServicesList />,
            },
        ],
    },
]);

ReactDOM.render(
    <React.StrictMode>
        <FirebaseContextProvider>
            <PrintContextProvider>
                <RouterProvider router={router} />
            </PrintContextProvider>
        </FirebaseContextProvider>
    </React.StrictMode>,
    document.getElementById("root")
);
