import { useContext, useEffect, useState } from "react";
import { FetchIndividualCryptoHolding, SelLCryptoAPI } from "../../Helpers/API_Calls";
import CurrencyText from "../CurrencyText/CurrencyText.component";
import { UserContext } from "../../Contexts/user.context";

const SellModal = ({ coin, setSellModal }) => {

    const { db_user, user, setRefresh } = useContext(UserContext);

    const [cryptoAmount, setCryptoAmount] = useState();
    const [fiatAmount, setFiatAmount] = useState();
    const [selling, setSelling] = useState(false);

    const [holdings, setHoldings] = useState()

    useEffect(() => {
        FetchIndividualCryptoHolding(user.uid, coin.uuid).then((res) => {
            setHoldings(res.amount)
        })
    }, [selling])

    const SellCryptoFn = () => {
        setSelling(true)
        SelLCryptoAPI(user.uid, coin.uuid, parseFloat(cryptoAmount)).then((res) => {
            if (res.status == "Success") {
                setSellModal(false)
            }
        }).finally(() => {
            setSelling(false)
            setRefresh((e) => !e)
        })
    }

    if (!user) {
        return (
            <div className="modal-blur">
                <div className="buy-modal login-container flex flex-col gap-4 bg-white p-6 rounded-lg font-semibold">
                    Login to paper trade cryptocurrencies.
                </div>
            </div>
        )
    }

    return (
        <div className="modal-blur">
            <div className="buy-modal login-container flex flex-col gap-4 bg-white p-6 rounded-lg font-semibold">
                <span className="material-symbols-outlined cursor-pointer self-end bg-red-800 rounded-lg p-1 text-lg text-white"
                    onClick={() => { setSellModal(false) }}>close</span>
                <span>Place order to sell {coin.name} <span className="text-xs text-gray-500">{coin.symbol}</span></span>

                <div className="flex w-full justify-between">
                    <span>Current Price:</span>
                    <span><CurrencyText amoun={coin.price} /></span>
                </div>
                <div className={"flex w-full justify-between" + (holdings >= cryptoAmount ? " text-green-500" : " text-red-500")}>
                    <span>Available Tokens:</span>
                    <span>{holdings?.toFixed(5)}</span>
                </div>

                <span className="text-xs flex justify-between">
                    <span>Amount in {coin.symbol}</span>
                    <span className="text-blue-500 cursor-pointer" onClick={() => { setCryptoAmount(holdings); setFiatAmount(coin.price * holdings) }}>Sell all?</span>
                </span>
                <input type="text" placeholder={`Enter amount in ${coin.symbol}`} value={cryptoAmount} onChange={(e) => {
                    setCryptoAmount(e.target.value)
                    setFiatAmount(coin.price * e.target.value)
                }} />

                <span className="text-xs">Amount in fiat</span>
                <input type="text" placeholder={`Enter amount in fiat`} value={fiatAmount} onChange={(e) => {
                    setFiatAmount(e.target.value)
                    setCryptoAmount(e.target.value / coin.price)
                }} />

                <div className="flex flex-col gap-1">
                    <span>Estimated Cost</span>
                    <hr />
                    <div className="flex w-full justify-between font-medium">
                        <span>{coin.symbol}</span>
                        <span><CurrencyText amoun={parseFloat(coin.price) * parseFloat(cryptoAmount)} /></span>
                    </div>
                    <div className="flex w-full justify-between font-medium">
                        <span>Wallet Balance</span>
                        <span><CurrencyText amoun={db_user.Current_Balance} /></span>
                    </div>
                </div>


                <button className="login" onClick={SellCryptoFn} disabled={holdings < cryptoAmount}>{selling ? "Completing transaction" : `Sell ${coin.symbol}`}</button>
            </div>
        </div>
    )
}

export default SellModal;