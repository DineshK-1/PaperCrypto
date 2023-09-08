import { Line } from "react-chartjs-2";
import ChangeText from "../ChangeText/ChangeText.component";
import CurrencyText from "../CurrencyText/CurrencyText.component";
import { Chart as ChartJS, CategoryScale, LineElement, LinearScale, PointElement, Title, Tooltip, Legend } from "chart.js";
import SparkLineChart from "../SparkLineChart/SparkLineChart.component";


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const CryptoTable = ({ coinData }) => {


    return (
        <table className="crypto-table card">
            <thead>
                <tr className="select-none">
                    <th>#</th>
                    <th>Symbol</th>
                    <th>Price</th>
                    <th>Change %</th>
                    <th>24 hour Chart</th>
                    <th>24h Volume</th>
                    <th>Market Cap</th>
                </tr>
            </thead>
            <tbody>
                {coinData["coins"].map((coin) => {
                    return (
                        <tr className="select-none cursor-pointer" key={coin.uuid}>
                            <td style={{ width: "80px" }}>{coin.rank}</td>
                            <td className="overflow-column">
                                <div className="flex gap-3 items-center">
                                    <img src={coin.iconUrl} width={24} />
                                    <div className="flex flex-col overflow-hidden whitespace-nowrap text-ellipsis">
                                        <span className="whitespace-nowrap text-ellipsis overflow-hidden">{coin.name}</span>
                                        <span className="text-xs text-gray-500 text-left">{coin.symbol}</span>
                                    </div>
                                </div>
                            </td>
                            <td><CurrencyText amoun={coin.price} /></td>
                            <td><ChangeText percent={coin.change} /></td>
                            <td style={{ maxWidth: "70px" }}><SparkLineChart chartData={coin.sparkline} /></td>
                            <td><CurrencyText amoun={coin["24hVolume"]} /></td>
                            <td><CurrencyText amoun={coin.marketCap} /></td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default CryptoTable;