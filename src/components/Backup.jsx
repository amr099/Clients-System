import React, { useContext } from "react";
import { FirebaseContext } from "context/FirebaseContext";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import { useMediaQuery } from "react-responsive";
import { Button } from "react-bootstrap";

export default function Backup() {
    const isMobile = useMediaQuery({ maxWidth: "769px" });
    const { clientsData } = useContext(FirebaseContext);

    // const handleBackup = () => {
    //     const file = new Blob(
    //         [
    //             `Clients : ${JSON.stringify(
    //                 clientsData.clients
    //             )} \n \n Expeneses : ${JSON.stringify(
    //                 expensesData.expenses
    //             )} \n \n Services : ${JSON.stringify(servicesData.services)}`,
    //         ],
    //         {
    //             type: "text/plain;charset=utf-8",
    //         }
    //     );
    //     saveAs(file, "backup.txt");
    // };

    const handleExport = () => {
        const wb = XLSX.utils.book_new();

        clientsData.clients.forEach((client, index) => {
            let balance = 0;
            const wsData = [
                ["Name:", client.name],
                ["Code:", client.code],
                ["Reg:", client.reg],
                ["Address:", client.address],
                ["Phone:", client.phone],
                [],
                ["Date", "Service", "Comment", "Cost", "Payment", "Balance"],
            ];

            client.transactions.forEach((transaction) => {
                const row = [
                    transaction.date || "",
                    transaction.service || "",
                    transaction.comment || "",
                    transaction.cost || 0,
                    transaction.payment || 0,
                    Number(transaction.cost) -
                        Number(transaction.payment) +
                        balance,
                ];
                wsData.push(row);
            });

            const ws = XLSX.utils.aoa_to_sheet(wsData);
            XLSX.utils.book_append_sheet(wb, ws, client.name);
        });

        XLSX.writeFile(wb, "clients_data.xlsx");
    };

    return (
        <>
            <Button
                variant='info'
                className={`${isMobile && "mx-auto"}`}
                onClick={handleExport}
            >
                <i className={`bi bi-cloud-download`}></i>{" "}
                {!isMobile && "Export to Excel"}
            </Button>
        </>
    );
}
