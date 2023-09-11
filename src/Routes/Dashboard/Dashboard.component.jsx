const DashboardRoute = () => {
    return (
        <div className="dashboard-route flex flex-col font-medium text-lg">
            <div className="flex w-full p-4">
                Start paper trading now!
            </div>
            <div className="flex gap-2">
                <div className="flex p-4 gap-1 items-center">
                    Current Balance:
                    <span className="blue font-semibold">Nil</span>
                </div>
                <div className="flex p-4 gap-1 items-center">
                    Portfolio Value:
                    <span className="blue font-semibold">Nil</span>
                </div>
            </div>

            <div className="flex flex-col gap-4 p-4">
                <span className="text-xl">Current Holdings</span>
                <div className="flex text-gray-500">
                    <span>Start paper trading crypto coins by clicking here!</span>
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