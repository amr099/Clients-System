import { Line } from "react-chartjs-2";

const months = Array.from({ length: 12 }, (e, i) => {
    return new Date(null, i + 1, null).toLocaleDateString("en", {
        month: "short",
    });
});

export const LineChart = () => {
    const chartData = {
        labels: [...months.slice(0, 7)],
        datasets: [
            {
                label: "revenues",
                data: [5500, 2300, 9600, 5500, 2300, 5500, 2300],
                backgroundColor: "#000",
                borderWidth: 1,
            },
        ],
    };
    return (
        <div>
            <h5 style={{ textAlign: "center" }}>Revenues</h5>
            <Line
                data={chartData}
                options={{
                    plugins: {
                        title: {
                            display: false,
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
