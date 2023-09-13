import { Fragment, useContext, useState } from "react";
import { UserContext } from "../../Contexts/user.context";
import AddMoney from "../../Components/AddMoney/AddMoney.component";

const DashboardRoute = () => {

    const { db_user } = useContext(UserContext);

    const [moneyModal, setModal] = useState(false);

    return (
        <Fragment>
            {
                moneyModal &&
                <AddMoney setModal={setModal} />
            }

            <div className="dashboard-route flex flex-col font-medium gap-4 cryptos-page text-base">
                <div className="flex gap-2 mt-10">
                    <div className="flex p-6 gap-3 items-center card flex-1 justify-between">
                        <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined bg-indigo-800 rounded-lg p-2 text-slate-300">account_balance</span>
                        <div className="flex flex-col">
                            <span className="text-sm">Current Balance:</span>
                            <span className="blue font-semibold">${db_user.Current_Balance}</span>
                        </div>
                        </div>
                        
                        <span
                            className="material-symbols-outlined bg-green-600 rounded-lg p-1 text-white cursor-pointer"
                            onClick={() => { setModal(true) }}
                        >add</span>
                    </div>
                    <div className="flex p-6 gap-3 items-center card flex-1">
                        <span className="material-symbols-outlined bg-indigo-800 rounded-lg p-2 text-slate-300">currency_bitcoin</span>
                        <div className="flex flex-col">
                            <span className="text-sm">Portfolio Value:</span>
                            <span className="blue font-semibold">$0.00</span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-4 p-4 card">
                    <span className="text-xl">Current Holdings</span>
                    <div className="flex text-gray-500">
                        <span>Get Started with Crypto today by clicking here!</span>
                    </div>
                </div>
                <div className="flex gap-5">
                    <div className="flex flex-col gap-4 p-4 px-6 card">
                        <span className="text-xl">Crypto Transaction History</span>
                        <div className="flex text-gray-500">
                            <span>No transactions yet!</span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 p-4 px-6 card">
                        <span className="text-xl">Fiat Transaction History</span>
                        <div className="flex text-gray-500">
                            <span>No deposits/withdrawals yet.</span>
                        </div>
                    </div>
                </div>

            </div>
        </Fragment>
    )
}

export default DashboardRoute;