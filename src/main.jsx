import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./global.scss";
import React from "react";
import ReactDOM from "react-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { FirebaseContextProvider } from "./context/FirebaseContext";
import Home from "./pages/Home";
import ClientForm from "./forms/ClientForm";
import TransactionForm from "./forms/TransactionForm";
import TransactionsTable from "./routes/TransactionsTable";
import Overview from "./routes/Overview";
import ClientInfoForm from "./forms/ClientInfoForm";
import ErrorPage from "pages/ErrorPage";
import ClientsTable from "routes/ClientsTable";

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
            { path: "/clients", element: <ClientsTable /> },
            {
                path: "/client",
                element: <ClientForm />,
            },
            {
                path: "/transaction/:id",
                element: <TransactionForm />,
            },
            {
                path: "/clientdetails/:id",
                element: <TransactionsTable />,
            },
            {
                path: "/transactions",
                element: <TransactionsTable />,
            },
            {
                path: "/edit/:id",
                element: <ClientInfoForm />,
            },
        ],
    },
]);

ReactDOM.render(
    <React.StrictMode>
        <FirebaseContextProvider>
            <RouterProvider router={router} />
        </FirebaseContextProvider>
    </React.StrictMode>,
    document.getElementById("root")
);
