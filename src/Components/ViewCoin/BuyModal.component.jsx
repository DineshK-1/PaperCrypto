import { useContext, useRef, useState } from "react";
import { BuyCryptoAPI } from "../../Helpers/API_Calls";
import CurrencyText from "../CurrencyText/CurrencyText.component";
import { UserContext } from "../../Contexts/user.context";

const BuyModal = ({ coin, setBuyModal }) => {

    const { db_user, user, setRefresh } = useContext(UserContext);

    const [amount, setAmount] = useState(0);
    const [buying, setBuying] = useState(false);

    const BuyCryptoFn = () => {
        setBuying(true)
        BuyCryptoAPI(user.uid, coin.uuid, parseFloat(amount)).then((res) => {
            if (res.status == "Success") {
                setBuyModal(false)
            }
        }).finally(() => {
            setBuying(false)
            setRefresh((e) => !e)
        })
    }

    return (
        <div className="modal-blur">
            <div className="buy-modal login-container flex flex-col gap-4 bg-white p-6 rounded-lg font-semibold">
                <span className="material-symbols-outlined cursor-pointer self-end bg-red-800 rounded-lg p-1 text-lg text-white"
                    onClick={() => { setBuyModal(false) }}>close</span>
                <span>Place order to buy {coin.name} <span className="text-xs text-gray-500">{coin.symbol}</span></span>

                <div className="flex w-full justify-between">
                    <span>Current Price:</span>
                    <span><CurrencyText amoun={coin.price} /></span>
                </div>

                <input type="text" placeholder="Enter amount here..." value={amount} onChange={(e) => {
                    setAmount(e.target.value.replace("/[^0-9]+/g", ""))
                    }} />

                <div className="flex flex-col gap-1">
                    <span>Estimated Cost</span>
                    <hr />
                    <div className="flex w-full justify-between font-medium">
                        <span>{coin.symbol}</span>
                        <span><CurrencyText amoun={parseFloat(coin.price) * parseFloat(amount)} /></span>
                    </div>
                    <div className={"flex w-full justify-between font-medium " + (parseFloat(coin.price) * parseFloat(amount) >= db_user.Current_Balance ? "text-red-500" : "text-green-500")}>
                        <span>Wallet Balance</span>
                        <span><CurrencyText amoun={db_user.Current_Balance} /></span>
                    </div>
                </div>


                <button className="login" onClick={BuyCryptoFn}>{buying ? "Completing transaction" : `Buy ${coin.symbol}`}</button>
            </div>
        </div>
    )
}

export default BuyModal;