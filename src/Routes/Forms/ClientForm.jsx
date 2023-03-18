import React, { useState, useContext } from "react";
import { setDoc, doc, arrayUnion } from "firebase/firestore";
import { FirebaseContext } from "context/FirebaseContext";
import { db } from "firebase-config";
import CustomForm from "components/CustomForm";

export default function ClientForm() {
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const { clients } = useContext(FirebaseContext);

    const inputs = [
        "newClientName",
        "newClient",
        "service",
        "cost",
        "payment",
        "dataAndComment",
    ];

    const onSubmit = async (e) => {
        try {
            console.log(clients);
            setSuccess(false);
            setLoading(true);
            e.preventDefault();
            let name = e.target[0].value;
            let code = e.target[1].value;
            let reg = e.target[2].value;
            let service = e.target[3].value;
            let cost = e.target[4].value;
            let payment = e.target[5].value;
            let comment = e.target[6].value;
            let d = new Date(e.target[7].value);
            let date = `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
            let address = e.target[8].value;
            let phone = e.target[9].value;

            if (clients.find((c) => c.name === name)) {
                console.log("this name already used");
                setError("this name already used");
                setLoading(false);
                setSuccess(false);

                return;
            }
            if (clients.find((c) => c.code === code)) {
                console.log("this code already used");
                setError("الكود موجود بالفعل");
                setLoading(false);
                setSuccess(false);

                return;
            }
            if (clients.find((c) => c.reg === reg)) {
                console.log("this regestiry code already used");
                setError("الرقم التسجيلى موجود بالفعل");
                setLoading(false);
                setSuccess(false);

                return;
            }

            let newTransaction = {
                service: service,
                cost: cost,
                payment: payment,
                amount: cost - payment,
                comment: comment,
                date: date,
            };

            let clientRef = await doc(db, "Clients", name);
            await setDoc(clientRef, {
                transaction: arrayUnion(newTransaction),
                name: name,
                code: code,
                reg: reg,
                address: address,
                phone: phone,
            });
            setLoading(false);
            setError(false);
            setSuccess(true);
            e.target.reset();
        } catch (e) {
            console.log(e.message);
            console.log("error adding new client.");
            setError(" خطأ");
            setLoading(false);
            setSuccess(false);
        }
    };

    return (
        <CustomForm
            label={"New Client"}
            onSubmit={onSubmit}
            error={error}
            loading={loading}
            success={success}
            inputs={inputs}
        />
    );
}
