import { useContext, useEffect, useState } from "react";
import CryptoTable from "../../Components/CryptoTable/CryptoTable.component";
import { details } from "../../Data/coins";
import { Quotes } from "../../Data/Quotes";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { FetchCoins } from "../../Helpers/API_Calls";

const CryptoRoute = () => {
    const det = details["data"];

    const [coins, setCoins] = useState([]);

    const [quote, setQuote] = useState(Quotes[Math.floor(Math.random() * Quotes.length - 1)])

    useEffect(() => {
        FetchCoins(25).then((res) => {
            setCoins(res.data);
        })

        const timer = setInterval(() => {
            setQuote(Quotes[Math.floor(Math.random() * Quotes.length - 2)])
        }, 4000);

        return () => clearInterval(timer);
    }, [])

    return (
        <>
            <div className="cryptos-page flex w-full">
                <div className="flex flex-col gap-5 mt-12 w-full mx-10">
                    <AnimatePresence>
                        <motion.div className="hidden flex-col gap-3 card p-5 lg:flex">
                            <motion.h2 className="text-2xl font-semibold" layout="position">Did you know?</motion.h2>

                            <motion.span key={quote} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 100 }} exit={{ y: -20, opacity: 0 }} className="text-sm sec-gray">{quote}</motion.span>

                        </motion.div>
                    </AnimatePresence>

                    <div className="table-section flex flex-col gap-5">
                        <h2 className="text-2xl font-semibold px-2">Cryptocurrencies</h2>
                        <div className="flex flex-col w-full">
                            {/* <div className="filter flex p-2 items-center gap-3">
                                <div className="flex gap-1 items-center">
                                    <span>Time Period:</span>
                                    <span className="bg-gray-500 px-2 py-1 rounded-lg text-xs">24h</span>
                                </div>

                                <div className="flex gap-1 items-center">
                                    <span>Sort by:</span>
                                    <span className="bg-gray-500 px-2 py-1 rounded-lg text-xs">Market Cap</span>
                                </div>

                                <div className="flex gap-1 items-center">
                                    <span>Ordered by:</span>
                                    <span className="bg-gray-500 px-2 py-1 rounded-lg text-xs">Desc</span>
                                </div>

                                <div className="flex gap-1 items-center">
                                    <span>Coins per page:</span>
                                    <span className="bg-gray-500 px-2 py-1 rounded-lg text-xs">10</span>
                                </div>
                            </div> */}
                            <CryptoTable coinData={coins} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CryptoRoute;