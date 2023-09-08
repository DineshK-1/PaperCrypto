import ChangeText from "../ChangeText/ChangeText.component";
import CurrencyText from "../CurrencyText/CurrencyText.component";

const CryptoTable = ({ coinData }) => {
    return (
        <table className="crypto-table card">
            <thead>
                <tr className="select-none">
                    <th>#</th>
                    <th>Symbol</th>
                    <th>Price</th>
                    <th>Change %</th>
                    <th>24h Volume</th>
                    <th>Market Cap</th>
                </tr>
            </thead>
            <tbody>
                {coinData["coins"].map((coin) => {
                    return (
                        <tr className="p-2 select-none cursor-pointer" key={coin.uuid}>
                            <td style={{ width: "80px" }}>{coin.rank}</td>
                            <td><div className="flex gap-3 justify-center"><img src={coin.iconUrl} width={24} />{coin.symbol}</div></td>
                            <td><CurrencyText amoun={coin.price} /></td>
                            <td><ChangeText percent={coin.change} /></td>
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