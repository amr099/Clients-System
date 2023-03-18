import React from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { collection } from "firebase/firestore";
import { db } from "firebase-config";

export default function SelectService() {
    const ServicesCol = collection(db, "Services");
    const [services, sloading, serror, ssnapshot] =
        useCollectionData(ServicesCol);
    services?.sort(function (a, b) {
        return a.pageId - b.pageId || a.name.localeCompare(b.name, ["ar"]);
    });
    return (
        <>
            <label for='service' className='mb-2'>
                Service<span>*</span>
            </label>
            <select className='form-select mb-4' id='services'>
                {services?.map((s) => (
                    <option value={s.name}>{s.name}</option>
                ))}
            </select>
        </>
    );
}
