import { Bar } from "react-chartjs-2";
import styles from "./overview.module.css";

export const BarChart = ({ chartData, title, text }) => {
    return (
        <div className={`chart-container ${styles?.chart}`}>
            <h2 style={{ textAlign: "center" }}>{title}</h2>
            <Bar
                data={chartData}
                options={{
                    plugins: {
                        title: {
                            display: true,
                            text: text,
                        },
                        legend: {
                            display: false,
                        },
                    },
                }}
            />
        </div>
    );
};
