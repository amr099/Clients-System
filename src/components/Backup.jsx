import React, { useContext } from "react";
import { FirebaseContext } from "context/FirebaseContext";

export default function Backup() {
    const { clients, services, expenses } = useContext(FirebaseContext);

    return (
        <>
            <button
                className='w-100 backup'
                onClick={() => {
                    navigator.clipboard.writeText(
                        `Clients : ${JSON.stringify(
                            clients
                        )} \n \n Expeneses : ${JSON.stringify(
                            expenses
                        )} \n \n Services : ${JSON.stringify(services)}`
                    );
                    alert(
                        "من فضلك قم بحفظ النسخة الاحتياطيه عن طريق عمل لصق للمعلومات فى ملف خارجى."
                    );
                }}
            >
                <i class='bi bi-cloud-download'></i> <span>Backup</span>
            </button>
        </>
    );
}
