import React from "react";
import { setDoc, doc, arrayUnion } from "firebase/firestore";
import { db } from "firebase-config";

const data = [];

export default function Restore() {
    const onSubmit = async () => {
        let count = 0;
        for (let client of data) {
            try {
                let clientRef = await doc(db, "Clients", client?.name);
                await setDoc(clientRef, {
                    transaction: arrayUnion(...client?.transaction),
                    name: client?.name,
                    code: client?.code,
                    reg: client?.reg,
                    address: client?.address,
                    phone: client?.phone,
                });
                console.log(client?.name, "added successfully");
                await count++;
                console.log(count);
            } catch (e) {
                console.log(e);
                console.log("error while adding ", client?.name);
            }
        }
    };
    return (
        <button className='mb-3 w-100 backup' onClick={onSubmit}>
            Restore
        </button>
    );
}
