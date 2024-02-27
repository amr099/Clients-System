import { FirebaseContext } from "context/FirebaseContext";
import { useContext, useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "firebase-config";
import { BarChart } from "../components/Charts/BarChart";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
import { Row, Col } from "react-bootstrap";
import { PieChart } from "../components/Charts/PieChart";
import { LineChart } from "../components/Charts/LineChart";
import Card from "../components/Card/Card";

Chart.register(CategoryScale);
export default function Overview() {
    const { clientsData } = useContext(FirebaseContext);
    const [transactions, setTransactions] = useState(0);
    const [paid, setPaid] = useState(0);
    const [pending, setPending] = useState(0);

    const cardsInfo = [
        {
            title: "Clients",
            value: clientsData?.clients?.length,
            icon: "bi bi-person-fill",
            color: "#51aa74",
        },
        {
            title: "Transactions",
            value: transactions,
            icon: "bi bi-stack",
            color: "#62c4ed",
        },
        {
            title: "Revenues",
            value: `$ ${paid}`,
            icon: "bi bi-cash",
            color: "#e73e4e",
        },
        {
            title: "Pending",
            value: `$ ${pending}`,
            icon: "bi bi-hourglass-split",
            color: "#efa920",
        },
    ];

    const fetch = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "Clients"));
            querySnapshot?.forEach((doc) => {
                setTransactions(
                    (prev) => (prev += doc.data()?.transactions?.length)
                );
                for (let t of doc.data()?.transactions) {
                    setPaid((prev) => (prev += Number(t.payment)));
                    setPending(
                        (prev) => (prev += Number(t.cost) - Number(t.payment))
                    );
                }
            });
        } catch (e) {
            console.log(`error while fetching data. \n ${e}`);
        }
    };

    useEffect(() => {
        fetch();
    }, []);

    return (
        <Col xs={{ span: 9 }}>
            <Row className='mt-4'>
                {cardsInfo?.map((card) => (
                    <Card
                        icon={card.icon}
                        color={card.color}
                        title={card.title}
                        value={card.value}
                    />
                ))}
            </Row>
            <Row>
                <Col md={8} xs={12}>
                    <BarChart />
                </Col>
                <Col md={4} xs={12}>
                    <PieChart />
                </Col>
            </Row>
            <LineChart />
        </Col>
    );
}
