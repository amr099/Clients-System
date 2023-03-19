import React, { useState, useContext, useEffect } from "react";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { FirebaseContext } from "context/FirebaseContext";
import Form from "react-bootstrap/Form";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    PointElement,
    LinearScale,
    LineElement
);

export default function Chart() {
    const [year, setYear] = useState();
    const [revenues, setRevenues] = useState([]);
    const { clients, expenses } = useContext(FirebaseContext);

    useEffect(() => {
        const getRevenues = async () => {
            let map = new Map([
                [1, 0],
                [2, 0],
                [3, 0],
                [4, 0],
                [5, 0],
                [6, 0],
                [7, 0],
                [8, 0],
                [9, 0],
                [10, 0],
                [11, 0],
                [12, 0],
            ]);
            await clients?.map((c) => {
                c.transaction?.map((t) => {
                    for (let [k, v] of map.entries()) {
                        if (Number(t.date.split("/")[1]) === k) {
                            map.set(k, map.get(k) + Number(t.payment) || 0);
                        }
                    }
                });
            });
            setRevenues([...map.values()]);
        };
        getRevenues();
    }, []);

    return (
        <>
            <Line
                datasetIdKey='id'
                data={{
                    labels: [
                        "January",
                        "February",
                        "March",
                        "April",
                        "May",
                        "June",
                        "July",
                        "August",
                        "September",
                        "October",
                        "November",
                        "December",
                    ],
                    datasets: [
                        {
                            id: 1,
                            label: "GrossIncome",
                            data: revenues,
                        },
                    ],
                }}
            />
        </>
    );
}
