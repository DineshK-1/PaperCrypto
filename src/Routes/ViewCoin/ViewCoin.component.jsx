import { useParams } from "react-router";
import CurrencyText from "../../Components/CurrencyText/CurrencyText.component";
import { Chart as ChartJS, CategoryScale, LineElement, LinearScale, PointElement, Title, Tooltip, Legend, Filler, defaults } from "chart.js";
import { Line } from "react-chartjs-2";
import Annotation from "chartjs-plugin-annotation";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FetchCoin, FetchCoinPrice } from "../../Helpers/API_Calls";


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

    const dateRange = ["3h", "24h", "7d", "30d", "3m", "1y", "3y", "5y"]

    const [activeRange, setActiveRange] = useState(1);

    const [coinDetails, setCoinDetails] = useState({});
    const [labelDetails, setLabelDetails] = useState([])
    const [priceDetails, setPriceDetails] = useState([]);

    const [loaded, setLoaded] = useState(false);
    const [chartLoaded, setChartLoaded] = useState(false);



    useEffect(() => {
        FetchCoin(uid, dateRange[activeRange]).then((res) => {
            setCoinDetails(res.data.coin);
        }).finally(() => {
            setLoaded(true);
        })
    }, [])

    useEffect(() => {
        setChartLoaded(false);
        FetchCoinPrice(uid, dateRange[activeRange]).then((res) => {
            let priceLabels = res.data.history.map((ele) => { return ele.price; })


            let dateLabels = res.data.history.map((ele) => {
                let date = new Date(ele.timestamp * 1000)
                let dateString = `${monthNames[date.getMonth()]} ${date.getDate()} ${date.getHours()}:${date.getMinutes()}`
                return dateString;
            })

            dateLabels = dateLabels.reverse();
            priceLabels = priceLabels.reverse();

            setPriceDetails(priceLabels);
            setLabelDetails(dateLabels);
        }).finally(() => {
            setChartLoaded(true);
        })
    }, [activeRange])

    defaults.font.family = "Inter";

    const monthNames = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'June',
        'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'
    ];

    const lastPrice = priceDetails[0];

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
                        borderColor: '#1450A3',
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
                ticks: {
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
        labels: labelDetails,
        datasets: [
            {
                data: priceDetails,
                borderColor: colorFunction,
                backgroundColor: (context) => {
                    const chart = context.chart;
                    const { ctx, chartArea } = chart;

                    if (!chartArea) {
                        return;
                    }

                    const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
                    if (coinDetails.price - lastPrice >= 0) {
                        gradient.addColorStop(1, "rgba(75, 226, 75, .5)");
                        gradient.addColorStop(.5, "rgba(75, 226, 75, .3)");
                        gradient.addColorStop(0, "rgba(0,0,0,0)");
                    } else {
                        gradient.addColorStop(1, "rgba(224, 53, 53, .5)");
                        gradient.addColorStop(.5, "rgba(224, 53, 53, .3)");
                        gradient.addColorStop(0, "rgba(0,0,0,0)");
                    }


                    return gradient
                },
                fill: true,
                pointRadius: 0,
                borderWidth: 2,
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

    if (!loaded) {
        return (
            <div className="loading">Loading</div>
        )
    }

    return (
        <div className="coin flex flex-col items-center font-semibold mt-6 gap-3">
            <div className="breadcrumb">
                <Link to="/Cryptos">Cryptocurrencies</Link> {">"} <span>{coinDetails.name}</span>
            </div>
            <div className="flex flex-col xl:flex-row mx-4 w-full md:w-5/6 gap-5 justify-center">
                <div className="flex flex-col w-full" style={{flex: "2"}}>
                    <div className="flex items-center gap-3 p-2 w-fit">
                        <img src={coinDetails.iconUrl} width={64} />
                        <div className="flex flex-col gap-3">
                            <div className="flex gap-3 items-center">
                                <div className="text-xl">{coinDetails.name}</div>
                                <div className="px-2 py-1 text-xs rounded-lg" style={{ border: `2px solid ${coinDetails.color}` }}>{coinDetails.symbol}</div>
                                <div className="p-2 px-3 text-xs rounded-lg rank-label select-none"># {coinDetails.rank}</div>
                            </div>
                            <div className="hidden md:flex text-gray-500">
                                {coinDetails.description}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col p-4 w-full">
                        <div className="flex justify-end cursor-pointer select-none">
                            {dateRange.map((date, idx) => {
                                return <span key={idx} className={"p-2 px-3 range-button rounded-md" + (idx == activeRange ? " activeRange" : "")} onClick={() => { setActiveRange(idx) }}>{date}</span>
                            })}
                        </div>
                        <Line data={data} options={options} />
                    </div>
                </div>
                <div className="flex flex-col gap-3 p-2 coin-details-container whitespace-nowrap text-gray-600">
                    <div className="flex items-center gap-2 text-black">
                        <div className="text-4xl"><CurrencyText amoun={coinDetails.price} /></div>
                        <div className={coinDetails.change >= 0 ? "profit-color" : "loss-color"}>{coinDetails.change} <span className="text-xs">{"(24h)"}</span></div>
                    </div>

                    <div className="text-xl text-black">Key Stats</div>
                    <div className="flex gap-2 justify-between">24h Volume<span><CurrencyText amoun={coinDetails["24hVolume"]} /></span></div>
                    <div className="flex gap-2 justify-between">Market Cap<span><CurrencyText amoun={coinDetails["marketCap"]} /></span></div>
                    <div className="flex gap-2 justify-between">Diluted Market Cap<span><CurrencyText amoun={coinDetails["fullyDilutedMarketCap"]} /></span></div>

                    <div className="flex flex-col items-center gap-3">
                        <div className="flex w-full text-xl justify-center cursor-pointer select-none items-center p-4 buy-button">
                            BUY
                        </div>
                        <div className="flex w-full text-xl justify-center cursor-pointer select-none items-center p-4 sell-button">
                            SELL
                        </div>
                    </div>

                    <div className="text-xl text-black">Links</div>
                    <div className="flex flex-wrap w-fit" style={{ maxWidth: "350px" }}>
                        {coinDetails.links.map((e) => {
                            return <Link to={e.url} className="p-2">{e.name}</Link>
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewCoin;