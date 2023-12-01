import { useLocation } from "react-router";

export default function Print({ styles, setPrint }) {
    const location = useLocation();
    const viewPages = ["/", "/Transactions", "/Expenses"];
    const print = async () => {
        if (viewPages.find((route) => route == location.pathname)) {
            try {
                await setPrint(true);
                window.print();
            } catch (e) {
                console.log(e);
            }
        } else {
            console.log("This page is not for printing");
        }
    };
    return (
        <button className={`mb-3 w-100 ${styles.backup}`} onClick={print}>
            <i className={`bi bi-printer ${styles.navicon}`}></i> Print
        </button>
    );
}
