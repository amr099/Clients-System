import React, { useContext } from "react";
import { FirebaseContext } from "context/FirebaseContext";
import { saveAs } from "file-saver";

export default function Backup() {
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
      <button className="w-100 backup" onClick={handleDownload}>
        <i class="bi bi-cloud-download"></i> <span>Backup</span>
      </button>
    </>
  );
}
