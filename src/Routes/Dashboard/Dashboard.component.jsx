import { Fragment, useContext, useEffect, useState } from "react";
import { UserContext } from "../../Contexts/user.context";
import AddMoney from "../../Components/AddMoney/AddMoney.component";
import CurrencyText from "../../Components/CurrencyText/CurrencyText.component";
import { FetchCryptoHoldings, FetchCryptoTransactions, FetchFiatTransactions, FetchInitialBalance, FetchListOfCoins } from "../../Helpers/API_Calls";
import CryptoHoldings from "../../Components/Dashboard/Holdings.component";
import CryptoTransactionsDashboard from "../../Components/Dashboard/CryptoTransactions.component";
import FiatTransactionsDashboard from "../../Components/Dashboard/FiatTransactions.component";

const DashboardRoute = () => {

    const { db_user, user } = useContext(UserContext);

    const [moneyModal, setModal] = useState(false);

    const [cryptoHoldings, setCryptoHoldings] = useState([]);

    const [listOfCoins, setListOfCoins] = useState([]);

    const [portValue, setValue] = useState(0);

    const [fiatTransactions, setFiatTransactions] = useState([]);
    const [cryptoTransactions, setCryptoTransactions] = useState([]);

    const [initialPortfolioValue, setInitialPortfolioValue] = useState(0);

    useEffect(() => {
        if (!user) {
            return;
        }

        FetchCryptoHoldings(user.uid).then((res) => {
            setCryptoHoldings(res)
        })

        FetchFiatTransactions(user.uid).then((res) => {
            setFiatTransactions(res)
        })

        FetchCryptoTransactions(user.uid).then((res) => {
            setCryptoTransactions(res)
        })

        FetchInitialBalance(user.uid).then((res) => {
            setInitialPortfolioValue(res?.original_value)
        })
    }, [])

    useEffect(() => {
        if (cryptoHoldings.length > 0) {
            const symbol_list = cryptoHoldings.map((holding) => {
                return holding.token_symbol
            })

            FetchListOfCoins(symbol_list).then((res) => {
                const coins = {}

                res.data.coins.map((coin) => {
                    coins[coin.symbol] = coin
                })

                setListOfCoins(coins);
            })

        }
    }, [cryptoHoldings])

    useEffect(() => {
        if (!listOfCoins.length === 0)
            return;

        let port = 0;

        cryptoHoldings.map((holding) => {
            port += holding.amount * listOfCoins[holding.token_symbol]?.price
        })

        setValue(port);
    }, [cryptoHoldings, listOfCoins])

    return (
        <Fragment>
            {
                moneyModal &&
                <AddMoney setModal={setModal} />
            }

            <div className="dashboard-route flex flex-col font-medium gap-4 cryptos-page text-base w-full px-5">
                <div className="flex gap-2 flex-wrap mt-10">
                    <div className="flex p-6 gap-3 items-center card flex-1 justify-between">
                        <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined bg-indigo-800 rounded-lg p-2 text-white">account_balance</span>
                            <div className="flex flex-col">
                                <span className="text-sm">Current Balance:</span>
                                <span className="blue font-semibold"><CurrencyText amoun={db_user?.Current_Balance} /></span>
                            </div>
                        </div>

                        <span
                            className="material-symbols-outlined bg-green-600 rounded-lg p-1 text-white cursor-pointer"
                            onClick={() => { setModal(true) }}
                        >add</span>
                    </div>
                    <div className="flex p-6 gap-3 items-center card flex-1">
                        <span className="material-symbols-outlined bg-indigo-800 rounded-lg p-2 text-white">currency_bitcoin</span>
                        <div className="flex flex-col">
                            <span className="text-sm">Portfolio Value:</span>
                            <span className="blue font-semibold flex gap-1 items-center">
                                <CurrencyText amoun={portValue} />
                                <span className={"text-xs" + (portValue - initialPortfolioValue >= 0 ? " text-green-500" : " text-red-500")}>{portValue - initialPortfolioValue >= 0 ? "+" : ""}{(portValue - initialPortfolioValue).toFixed(2)}</span>
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex w-full gap-4 items-start flex-wrap">
                    <div className="flex flex-col gap-4" style={{ flex: "2" }}>

                        <div className="flex flex-col gap-4 p-5 card">
                            <span className="text-lg flex w-full justify-between items-center">Current Holdings<span className="text-sm cursor-pointer">View all</span></span>
                            <div className="flex">
                                <CryptoHoldings holdings={cryptoHoldings.slice(0, 6)} listOfCoins={listOfCoins} />
                            </div>
                        </div>

                        <div className="flex gap-5">
                            <div className="flex flex-col gap-4 p-4 px-6 card w-full">
                                <span className="text-lg flex w-full justify-between items-center"><span>Fiat Transaction History</span><span className="text-sm cursor-pointer">View all</span></span>
                                <div className="flex">
                                    <FiatTransactionsDashboard transactions={fiatTransactions.slice(0, 8)} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 p-5 px-6 card flex-1">
                        <span className="text-lg flex w-full justify-between items-center"><span>Crypto Transaction History</span><span className="text-sm cursor-pointer">View all</span></span>
                        <div className="flex">
                            <CryptoTransactionsDashboard transactions={cryptoTransactions.slice(0, 12)} />
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default DashboardRoute;