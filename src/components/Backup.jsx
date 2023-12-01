import React, { useContext } from "react";
import { FirebaseContext } from "context/FirebaseContext";
import { saveAs } from "file-saver";

export default function Backup({ styles }) {
    const { clientsData, servicesData, expensesData } =
        useContext(FirebaseContext);

    const handleDownload = () => {
        const file = new Blob(
            [
                `Clients : ${JSON.stringify(
                    clientsData.clients
                )} \n \n Expeneses : ${JSON.stringify(
                    expensesData.expenses
                )} \n \n Services : ${JSON.stringify(servicesData.services)}`,
            ],
            {
                type: "text/plain;charset=utf-8",
            }
        );
        saveAs(file, "backup.txt");
    };

    return (
        <>
            <button
                className={`backup ${styles.backup}`}
                onClick={handleDownload}
            >
                <i className={`bi bi-cloud-download ${styles.navicon}`}></i>{" "}
                <span>Backup</span>
            </button>
        </>
    );
}
