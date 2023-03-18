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
        "dateAndComment",
    ];

    const onSubmit = async (data) => {
        try {
            setSuccess(false);
            setLoading(true);

            if (clients.find((c) => c.name === data.newClientName)) {
                console.log("this name already used");
                setError("this name already used");
                setLoading(false);
                setSuccess(false);

                return;
            }
            if (clients.find((c) => c.code === data.code)) {
                console.log("this code already used");
                setError("الكود موجود بالفعل");
                setLoading(false);
                setSuccess(false);

                return;
            }
            if (clients.find((c) => c.reg === data.reg)) {
                console.log("this regestiry code already used");
                setError("الرقم التسجيلى موجود بالفعل");
                setLoading(false);
                setSuccess(false);

                return;
            }

            let newTransaction = {
                service: data.service,
                cost: data.cost,
                payment: data.payment,
                comment: data.comment,
                date: `${new Date(data.date).getDate()}/${
                    new Date(data.date).getMonth() + 1
                }/${new Date(data.date).getFullYear()}`,
            };

            let clientRef = await doc(db, "Clients", data.newClientName);
            await setDoc(clientRef, {
                transaction: arrayUnion(newTransaction),
                name: data.newClientName,
                code: data.code,
                reg: data.reg,
                address: data.address,
                phone: data.phone,
            });
            setLoading(false);
            setError(false);
            setSuccess(true);
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
