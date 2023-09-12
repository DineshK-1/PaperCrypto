import { useContext } from "react";
import { UserContext } from "../../Contexts/user.context";

const DashboardRoute = () => {

    const { db_user } = useContext(UserContext);

    return (
        <div className="dashboard-route flex flex-col font-medium text-lg cryptos-page">
            <div className="flex gap-2 mt-10">
                <div className="flex p-6 gap-3 items-center card">
                    <span className="material-symbols-outlined bg-indigo-800 rounded-lg p-2 text-slate-300">account_balance</span>
                    <div className="flex flex-col">
                        <span className="text-sm">Current Balance:</span>
                        <span className="blue font-semibold">${db_user.Current_Balance}</span>
                    </div>
                    <span className="material-symbols-outlined bg-green-600 rounded-lg p-1 text-white">add</span>
                </div>
                <div className="flex p-6 gap-3 items-center card">
                    <span className="material-symbols-outlined bg-indigo-800 rounded-lg p-2 text-slate-300">currency_bitcoin</span>
                    <div className="flex flex-col">
                        <span className="text-sm">Portfolio Value:</span>
                        <span className="blue font-semibold">$0.00</span>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-4 p-4">
                <span className="text-xl">Current Holdings</span>
                <div className="flex text-gray-500">
                    <span>Get Started with Crypto today by clicking here!</span>
                </div>
            </div>
            <div className="flex flex-col gap-4 p-4">
                <span className="text-xl">Transaction History</span>
                <div className="flex text-gray-500">
                    <span>No Transactions yet</span>
                </div>
            </div>
        </div>
    )
}

export default DashboardRoute;