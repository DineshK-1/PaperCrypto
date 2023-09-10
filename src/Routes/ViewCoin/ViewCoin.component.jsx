import { useParams } from "react-router";
import { coin } from "../../Data/coin";
import CurrencyText from "../../Components/CurrencyText/CurrencyText.component";
import { Chart as ChartJS, CategoryScale, LineElement, LinearScale, PointElement, Title, Tooltip, Legend, Filler, defaults } from "chart.js";
import { coinPrice } from "../../Data/coinPrice";
import { Line } from "react-chartjs-2";
import Annotation from "chartjs-plugin-annotation";
import { useEffect, useState } from "react";


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
    Annotation,
);

const ViewCoin = () => {
    const { uid } = useParams();

    defaults.font.family = "Inter";

    const monthNames = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'June',
        'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'
    ];

    const deets = coin["data"]["coin"];

    const price = coinPrice["data"]["history"];

    let AdateLabels = price.map((ele) => {
        let date = new Date(ele.timestamp * 1000)
        let dateString = `${monthNames[date.getMonth()]} ${date.getDate()} ${date.getHours()}:${date.getMinutes()}`
        return dateString;
    })

    let ApriceLabels = price.map((ele) => { return ele.price; })

    AdateLabels = AdateLabels.reverse();
    ApriceLabels = ApriceLabels.reverse();

    const [dateLabels, setDateLabels] = useState([]);
    const [priceLabels, setPriceLabels] = useState([]);

    useEffect(() => {
        AdateLabels.map((ele) => {
            setDateLabels((e) => {
                return [...e, ele]
            })
        })
        ApriceLabels.map((ele) => {
            setPriceLabels((e) => {
                return [...e, ele]
            })
        })
    }, [])

    const lastPrice = priceLabels[0];

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
                mode: 'index',
                intersect: false,
                position: 'nearest',
                backgroundColor: '#fff',
                titleColor: "#000",
                bodyColor: "#000",
                usePointStyle: true,
                callbacks: {
                    labelPointStyle: function (ctx) {
                        if (ctx.parsed) {
                            if (lastPrice >= ctx.parsed.y) {
                                return { pointStyle: 'triangle', rotation: 180 };
                            }
                        }
                        return { pointStyle: 'triangle' };
                    },
                    label: function (context) {
                        return `Price: $${context.formattedValue}`
                    }
                }
            },
            annotation: {
                annotations: {
                    line1: {
                        type: 'line',
                        yMin: lastPrice,
                        yMax: lastPrice,
                        borderColor: 'rgb(255, 99, 132)',
                        borderWidth: 2,
                        borderDash: [6, 6]
                    },
                }
            }
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
                ticks:{
                    display: false
                }
            },
        },
        bezierCurve: true,
    };

    const colorFunction = (ctx) => {
        if (ctx.parsed) {
            if (lastPrice >= ctx.parsed.y) {
                return "#e03535"
            }
        }
        return "#4be24b"
    }

    const data = {
        labels: dateLabels,
        datasets: [
            {
                data: priceLabels,
                borderColor: colorFunction,
                backgroundColor: (context) => {
                    const chart = context.chart;
                    const { ctx, chartArea } = chart;

                    if (!chartArea) {
                        return;
                    }

                    const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
                    if (context.parsed) {
                        if (lastPrice >= context.parsed.y) {
                            return "#e03535"
                        }
                    }

                    gradient.addColorStop(1, "rgba(75, 226, 75, .5)");
                    gradient.addColorStop(.5, "rgba(75, 226, 75, .3)");
                    gradient.addColorStop(0, "rgba(0,0,0,0)");
                    return gradient
                },
                fill: true,
                pointRadius: 1,
                tension: .2,
                segment: {
                    borderColor: function (context) {

                        if (context.p0.parsed) {
                            if (lastPrice > context.p0.parsed.y) {
                                return "#e03535"
                            }
                        }
                        return "#4be24b"
                    }
                }
            },
        ],
    };



    return (
        <div className="coin flex flex-col font-semibold mt-6 gap-3">
            <div className="breadcrumb">
                Cryptos {">"}
            </div>
            <div className="flex mx-4 gap-2">
                <div className="flex flex-col w-full">
                    <div className="flex items-center gap-3 p-2 w-fit">
                        <img src={deets.iconUrl} width={64} />
                        <div className="flex flex-col gap-3">
                            <div className="flex gap-3 items-center">
                                <div className="">{deets.name}</div>
                                <div className="px-2 py-1 text-xs rounded-lg" style={{ border: `2px solid ${deets.color}` }}>{deets.symbol}</div>
                            </div>
                            <div className="flex text-gray-500">
                                {deets.description}
                            </div>
                        </div>
                    </div>
                    <div className="flex p-4">
                        <Line data={data} options={options} />
                    </div>
                </div>
                <div className="flex flex-wrap items-center gap-3 p-2 w-fit">
                    <div className="flex gap-2">24h Volume: <CurrencyText amoun={deets["24hVolume"]} /></div>
                    <div className="flex gap-2">Market Cap: <CurrencyText amoun={deets["marketCap"]} /></div>
                    <div className="flex gap-2">Diluted Market Cap: <CurrencyText amoun={deets["marketCap"]} /></div>
                </div>
            </div>
        </div>
    )
}

export default ViewCoin;