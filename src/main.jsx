import React from "react";
import ReactDOM from "react-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { FirebaseContextProvider } from "./context/FirebaseContext";
import Home from "./Pages/Home";
import ClientForm from "./Routes/Forms/ClientForm";
import TransactionForm from "./Routes/Forms/TransactionForm";
import PaymentForm from "./Routes/Forms/PaymentForm";
import ExpensesForm from "./Routes/Forms/ExpensesForm";
import ClientInfoForm from "./Routes/Forms/ClientInfoForm";
import ServicesList from "./Routes/Forms/ServicesList";
import TransactionsTable from "./Routes/Tables/TransactionsTable";
import RevenuesTable from "./Routes/Tables/RevenuesTable";
import ExpensesTable from "Routes/Tables/ExpensesTable";
import RevenuesChart from "./Routes/Tables/RevenuesChart";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./index.css";
import { PrintContextProvider } from "context/PrintContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
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
        path: "/revenues",
        element: <RevenuesTable />,
      },
      // {
      //   path: "/revenueschart",
      //   element: <RevenuesChart />,
      // },
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
