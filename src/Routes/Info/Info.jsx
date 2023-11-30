import styles from "./info.module.css";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import { FirebaseContext } from "context/FirebaseContext";
import { useContext, useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "firebase-config";
export default function ExpensesTable() {
    const { clientsData } = useContext(FirebaseContext);
    const [transactions, setTransactions] = useState(0);
    const [paid, setPaid] = useState(0);
    const [pending, setPending] = useState(0);

    const cardsInfo = [
        { title: "Clients", value: clientsData?.clients?.length },
        { title: "Transactions", value: transactions },
        { title: "Revenues", value: `$ ${paid}` },
        { title: "Pending", value: `$ ${pending}` },
    ];

    const fetch = async () => {
        const querySnapshot = await getDocs(collection(db, "Clients"));
        querySnapshot.forEach((doc) => {
            setTransactions(
                (prev) => (prev += doc.data()?.transaction?.length)
            );
            for (let t of doc.data()?.transaction) {
                setPaid((prev) => (prev += Number(t.payment)));
                setPending(
                    (prev) => (prev += Number(t.cost) - Number(t.payment))
                );
            }
        });
    };
    useEffect(() => {
        fetch();
    }, []);

    return (
        <Container className='w-90 mx-auto mt-4'>
            <div className={styles.row}>
                {cardsInfo.map((card) =>
                    card.value ? (
                        <div className={styles.card}>
                            <h6>{card.title} </h6>
                            <p>{card.value}</p>
                        </div>
                    ) : (
                        <div className={styles.skeleton}>
                            <div></div>
                            <div></div>
                        </div>
                    )
                )}
            </div>
        </Container>
    );
}
