import { signOut } from "./firebase/auth";
import { auth } from "./firebase-config";
import { useContext } from "react";
import { FirebaseContext } from "./context/FirebaseContext";

export default function LogOut() {
    const { clients, services, expenses } = useContext(FirebaseContext);

    const Out = async () => {
        let resp = window.confirm("هل انت متأكد من تسجيل الخروج ؟");

        if (resp) {
            navigator.clipboard.writeText(
                `Clients : ${JSON.stringify(
                    clients
                )} \n \n Expeneses : ${JSON.stringify(
                    expenses
                )} \n \n Services : ${JSON.stringify(services)}`
            );
            alert(
                " من فضلك قم بحفظ النسخة الاحتياطيه عن طريق عمل لصق للمعلومات فى ملف خارجى."
            );
            signOut(auth);
        }
    };

    return (
        <i className='bi bi-arrow-left-square-fill logout' onClick={Out}></i>
    );
}
