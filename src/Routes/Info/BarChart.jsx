import { Bar } from "react-chartjs-2";
export const BarChart = ({ chartData, title, text, styles }) => {
    return (
        <div className={`chart-container ${styles}`}>
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
