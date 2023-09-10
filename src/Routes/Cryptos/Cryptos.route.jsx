import { useEffect, useState } from "react";
import CryptoTable from "../../Components/CryptoTable/CryptoTable.component";
import { details } from "../../Data/coins";
import { Quotes } from "../../Data/Quotes";

const CryptoRoute = () => {
    const det = details["data"];

    const [quote, setQuote] = useState(Quotes[Math.floor(Math.random() * Quotes.length-1)])

    useEffect(() => {
        const timer = setInterval(() => {
            setQuote(Quotes[Math.floor(Math.random() * Quotes.length-1)])
        }, 4000);

        return () => clearInterval(timer);
    }, [])
    
    return (
        <>
            <div className="cryptos-page flex w-full">
                <div className="flex flex-col gap-5 mt-12 w-full mx-10">
                    <div className="hidden flex-col gap-3 card p-5 lg:flex">
                        <h2 className="text-2xl font-semibold">Did you know?</h2>
                        <span className="text-sm text-gray-500">{quote}</span>
                    </div>

                    <div className="table-section flex flex-col gap-5">
                        <h2 className="text-2xl font-semibold px-2">Crypto Coins</h2>
                        <div className="flex flex-col w-full">
                            <CryptoTable coinData={det} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CryptoRoute;