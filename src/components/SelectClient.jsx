import React from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { collection } from "firebase/firestore";
import { db } from "firebase-config";

export default function SelectClient({ mang }) {
    const ClientsCol = collection(db, "Clients");
    const [clients, loading, error, snapshot] = useCollectionData(ClientsCol);
    clients?.sort(function (a, b) {
        return a.pageId - b.pageId || a.name.localeCompare(b.name, ["ar"]);
    });
    return (
        <>
            <label for='client' className='mb-2'>
                Name<span>*</span>
            </label>

            <select class='form-select mb-4'>
                {mang && <option value='مصروفات اداريه'>مصروفات اداريه</option>}
                {clients?.map((c) => (
                    <option value={c.name}>{c.name}</option>
                ))}
            </select>
        </>
    );
}
