import styles from "./info.module.css";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import { FirebaseContext } from "context/FirebaseContext";
import { useContext, useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "firebase-config";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { BarChart } from "./BarChart";

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

    const data = [
        5500, 2300, 9600, 5500, 2300, 9600, 5500, 2300, 9600, 5500, 2300, 9600,
    ];

    useEffect(() => {
        fetch();
    }, []);

    const months = Array.from({ length: 12 }, (e, i) => {
        return new Date(null, i + 1, null).toLocaleDateString("en", {
            month: "short",
        });
    });

    const chartData = {
        labels: [...months],
        datasets: [
            {
                label: "revenues",
                data: [
                    5500, 2300, 9600, 5500, 2300, 9600, 5500, 2300, 9600, 5500,
                    2300, 9600,
                ],
                backgroundColor: "#000",
                borderWidth: 1,
            },
        ],
    };

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
            <BarChart
                chartData={chartData}
                title={"Revenues Of The Year"}
                text={"Revenues through the year of 2023"}
                styles={styles.chart}
            />
        </Container>
    );
}
