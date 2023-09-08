import { Line } from "react-chartjs-2";

const SparkLineChart = ({ chartData }) => {
    const options = {
        responsive: true,
        plugins: {
            title: {
                display: false,
            },
            legend: {
                display: false
            },
            tooltip: {
                enabled: false
            },
            hover: {
                enabled: false
            }
        },
        scales: {
            x: {
                display: false
            },
            y: {
                display: false
            }
        },

    };

    const difference = parseFloat(chartData[0]) - parseFloat(chartData[23]);

    const labels = chartData.map(() => { return "" });
    const data = {
        labels,
        datasets: [
            {
                data: chartData,
                borderColor: difference > 0 ? "rgb(210, 4, 45)" : "rgb(39, 174, 96)",
                backgroundColor: difference > 0 ? "rgb(210, 4, 45)" : "rgb(39, 174, 96)",
                pointRadius: 1
            },
        ],
    };

    return (
        <div className="chart flex justify-center" style={{ height: "70px" }}>
            <Line data={data} options={options} />
        </div>
    )
}

export default SparkLineChart;