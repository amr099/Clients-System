import React, { useContext } from "react";
import { FirebaseContext } from "context/FirebaseContext";

export default function Backup() {
    const { clientsData, servicesData, expensesData } =
        useContext(FirebaseContext);

    const copyToClipbaord = () => {
        if (
            clientsData.clients &&
            servicesData.services &&
            expensesData.expenses
        ) {
            navigator.clipboard.writeText(
                `Clients : ${JSON.stringify(
                    clientsData.clients
                )} \n \n Expeneses : ${JSON.stringify(
                    expensesData.expenses
                )} \n \n Services : ${JSON.stringify(servicesData.services)}`
            );
            alert("Information have been copied to the clipboard.");
        }
    };

    return (
        <>
            <button className='w-100 backup' onClick={copyToClipbaord}>
                <i class='bi bi-cloud-download'></i> <span>Backup</span>
            </button>
        </>
    );
}
