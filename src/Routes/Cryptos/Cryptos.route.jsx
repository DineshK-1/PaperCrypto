import CryptoTable from "../../Components/CryptoTable/CryptoTable.component";
import { details } from "../../Data/coins";

const CryptoRoute = () => {
    const det = details["data"];

    return (
        <>
            <div className="cryptos-page flex w-full">
                <div className=" flex flex-col gap-5 mt-12 w-full">
                    <div className="flex flex-col gap-3 card p-5">
                        <h2 className="text-3xl font-semibold">Did you know?</h2>
                        <span className="text-sm text-gray-500">The first real-world Bitcoin transaction involved buying two pizzas for 10,000 BTC in 2010, now worth millions.</span>
                    </div>

                    <div className="table-section flex flex-col gap-5">
                        <h2 className="text-3xl font-semibold">Crypto Coins</h2>
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