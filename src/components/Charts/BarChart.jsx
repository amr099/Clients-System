import { Bar } from "react-chartjs-2";

const months = Array.from({ length: 12 }, (e, i) => {
    return new Date(null, i + 1, null).toLocaleDateString("en", {
        month: "short",
    });
});

export const BarChart = () => {
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
        <div>
            <h5 style={{ textAlign: "center" }}>BarChart</h5>
            <Bar
                data={chartData}
                options={{
                    plugins: {
                        title: {
                            display: false,
                            text: "",
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
