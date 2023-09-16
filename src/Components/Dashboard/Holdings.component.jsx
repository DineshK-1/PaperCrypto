import { useEffect } from "react"
import CurrencyText from "../CurrencyText/CurrencyText.component";

const CryptoHoldings = ({ holdings, listOfCoins }) => {

    useEffect(() => {
        if (!listOfCoins) {
            return;
        }
    }, [listOfCoins])

    if (!holdings.length)
        return <span>Get Started with Crypto today by clicking here!</span>

    return (
        <div className="flex flex-col w-full text-sm text-black gap-2">
            {
                holdings &&
                holdings.map((holding, idx) => {
                    return (
                        <div key={idx} className="holding flex">
                            <div className="flex items-center justify-between w-full">
                                <div className="flex gap-3">
                                    <img src={listOfCoins[holding.token_symbol]?.iconUrl} width={32} />
                                    <div className="flex flex-col">
                                        <span>{holding.token_name}</span>
                                        <span className="text-gray-500 text-xs">{holding.token_symbol}</span>
                                    </div>
                                </div>

                                <div className="flex flex-col">
                                    <span><CurrencyText amoun={listOfCoins[holding.token_symbol]?.price * holding.amount} /></span>
                                    <span className="text-gray-500 text-xs self-end">{holding.amount}</span>
                                </div>
                            </div>



                        </div>
                    )
                })}
        </div>
    )
}

export default CryptoHoldings;