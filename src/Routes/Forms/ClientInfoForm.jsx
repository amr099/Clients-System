import React, { useState, useContext } from "react";
import { updateDoc, doc } from "firebase/firestore";
import { FirebaseContext } from "context/FirebaseContext";
import { db } from "firebase-config";
import CustomForm from "components/CustomForm";

export default function ClientInfoForm() {
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const { clients } = useContext(FirebaseContext);

    const inputs = ["selectClient", "newClient"];

    const onSubmit = async (data) => {
        console.log(data);
        setSuccess(false);
        setLoading(true);

        if (clients.find((c) => c.code === data.code)) {
            console.log("this code already used");
            setError("الكود موجود بالفعل");
            setLoading(false);
            return;
        }
        if (clients.find((c) => c.reg === data.reg)) {
            console.log("this regestiry code already used");
            setError("الرقم التسجيلى موجود بالفعل");
            setLoading(false);
            return;
        }

        try {
            let clientDoc = doc(db, "Clients", data.clientName);

            if (data.code) await updateDoc(clientDoc, { code: data.code });
            if (data.reg) await updateDoc(clientDoc, { reg: data.reg });
            if (data.phone) await updateDoc(clientDoc, { phone: data.phone });
            if (data.address)
                await updateDoc(clientDoc, { address: data.address });
            setLoading(false);
            setSuccess(true);
            setError(false);
        } catch (e) {
            if (
                e.message ===
                "No document to update: projects/clients-mangement-system/databases/(default)/documents/Clients/sada"
            ) {
                setError("لا يوجد عميل بهذا الاسم");
                setLoading(false);
                setSuccess(false);
            } else {
                console.log(e.message);
                setError("خطأ");
                setLoading(false);
                setSuccess(false);
            }
        }
    };
    return (
        <CustomForm
            label={"Edit Client Info."}
            onSubmit={onSubmit}
            loading={loading}
            success={success}
            error={error}
            inputs={inputs}
        />
    );
}
