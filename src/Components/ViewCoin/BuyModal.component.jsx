import { useContext, useEffect, useRef, useState } from "react";
import { BuyCryptoAPI } from "../../Helpers/API_Calls";
import CurrencyText from "../CurrencyText/CurrencyText.component";
import { UserContext } from "../../Contexts/user.context";

const BuyModal = ({ coin, setBuyModal }) => {

    const { db_user, user, setRefresh } = useContext(UserContext);

    const [cryptoAmount, setCryptoAmount] = useState();
    const [fiatAmount, setFiatAmount] = useState(0);
    const [buying, setBuying] = useState(false);

    const BuyCryptoFn = () => {
        setBuying(true)
        BuyCryptoAPI(user.uid, coin.uuid, parseFloat(cryptoAmount)).then((res) => {
            if (res.status == "Success") {
                setBuyModal(false)
            }
        }).finally(() => {
            setBuying(false)
            setRefresh((e) => !e)
        })
    }

    if (!user) {
        return (
            <div className="modal-blur">
                <div className="buy-modal login-container flex flex-col gap-4 p-6 card rounded-lg font-semibold">
                    <span className="text-red-500 self-end" onClick={() => { setBuyModal(false) }}>Close</span>
                    Login to paper trade cryptocurrencies.

                </div>
            </div>
        )
    }

    return (
        <div className="modal-blur">
            <div className="buy-modal login-container flex flex-col gap-4 card p-6 rounded-lg font-semibold">
                <span className="material-symbols-outlined cursor-pointer self-end bg-red-800 rounded-lg p-1 text-lg text-white"
                    onClick={() => { setBuyModal(false) }}>close</span>
                <span>Place order to buy {coin.name} <span className="text-xs text-gray-500">{coin.symbol}</span></span>

                <div className="flex w-full justify-between">
                    <span>Current Price:</span>
                    <span><CurrencyText amoun={coin.price} /></span>
                </div>

                <span className="text-xs">Amount in {coin.symbol}</span>
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
                    <div className={"flex w-full justify-between font-medium " + (parseFloat(coin.price) * parseFloat(cryptoAmount) >= db_user.Current_Balance ? "text-red-500" : "text-green-500")}>
                        <span>Wallet Balance</span>
                        <span><CurrencyText amoun={db_user.Current_Balance} /></span>
                    </div>
                </div>


                <button className="login" onClick={BuyCryptoFn} disabled={!cryptoAmount}>{buying ? "Completing transaction" : `Buy ${coin.symbol}`}</button>
            </div>
        </div>
    )
}

export default BuyModal;