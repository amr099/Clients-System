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

    const onSubmit = async (e) => {
        setSuccess(false);
        setLoading(true);
        e.preventDefault();
        let clientName = e.target[0].value;
        let code = e.target[1].value;
        let reg = e.target[2].value;
        let address = e.target[3].value;
        let phone = e.target[4].value;

        if (clients.find((c) => c.code === code)) {
            console.log("this code already used");
            setError("الكود موجود بالفعل");
            setLoading(false);
            return;
        }
        if (clients.find((c) => c.reg === reg)) {
            console.log("this regestiry code already used");
            setError("الرقم التسجيلى موجود بالفعل");
            setLoading(false);
            return;
        }

        try {
            let clientDoc = doc(db, "Clients", clientName);

            if (code) await updateDoc(clientDoc, { code: code });
            if (reg) await updateDoc(clientDoc, { reg: reg });
            if (phone) await updateDoc(clientDoc, { phone: phone });
            if (address) await updateDoc(clientDoc, { address: address });
            setLoading(false);
            setSuccess(true);
            setError(false);
            e.target.reset();
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
