import CurrencyText from "../CurrencyText/CurrencyText.component";

const FiatTransactionsDashboard = ({ transactions }) => {

    if (!transactions.length)
        return <span>No transactions yet!</span>

    return (
        <div className="flex flex-col w-full text-black text-sm gap-3">
            {transactions.map((transaction) => {
                return (
                    <div key={transaction.transaction_id} className="flex items-center justify-between">
                        <div className="flex gap-2 items-center">
                            <div className="flex text-xs px-2 py-1 rounded-md" style={{
                                border: transaction.transaction_type === "Deposit" ? "1px solid #4be24b" : "1px solid #e03535",
                                backgroundColor: transaction.transaction_type === "Deposit" ? "rgba(75, 226, 75, .5)" : "rgba(224, 53, 53, .5)"
                            }}>{transaction.transaction_type}</div>

                            <div className="flex flex-col">
                                <CurrencyText amoun={transaction.amount} />
                            </div>
                        </div>

                        <div className="flex flex-col items-end">
                            <span>{new Date(transaction.transaction_time).toLocaleString()}</span>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default FiatTransactionsDashboard;