import { useContext, useEffect, useState } from "react";
import CryptoTable from "../../Components/CryptoTable/CryptoTable.component";
import { details } from "../../Data/coins";
import { Quotes } from "../../Data/Quotes";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { UserContext } from "../../Contexts/user.context";

const CryptoRoute = () => {
    const det = details["data"];

    const [quote, setQuote] = useState(Quotes[Math.floor(Math.random() * Quotes.length - 1)])

    useEffect(() => {
        const timer = setInterval(() => {
            setQuote(Quotes[Math.floor(Math.random() * Quotes.length - 2)])
        }, 4000);

        return () => clearInterval(timer);
    }, [])

    const { user } = useContext(UserContext);

    return (
        <>
            <div className="cryptos-page flex w-full">
                <div className="flex flex-col gap-5 mt-12 w-full mx-10">
                    <AnimatePresence>
                        <motion.div className="hidden flex-col gap-3 card p-5 lg:flex">
                            <motion.h2 className="text-2xl font-semibold" layout="position">Did you know?</motion.h2>

                            <motion.span key={quote} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 100 }} exit={{ y: -20, opacity: 0 }} className="text-sm text-gray-500">{quote}</motion.span>

                        </motion.div>
                    </AnimatePresence>

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