import CurrencyText from "../CurrencyText/CurrencyText.component";

const CryptoTransactionsDashboard = ({ transactions }) => {

    if (!transactions.length)
        return <span>No transactions yet!</span>

    return (
        <div className="flex flex-col gap-2  w-full text-sm">
            {transactions.map((transaction) => {
                return (
                    <div key={transaction.transaction_id} className="flex items-center justify-between px-2 py-1 rounded-lg transaction-card" style={{
                        border: transaction.transaction_type === "BUY" ? "1px solid #4be24b" : "1px solid #e03535",
                        backgroundColor: transaction.transaction_type === "BUY" ? "rgba(75, 226, 75, .5)" : "rgba(224, 53, 53, .5)"
                    }}>
                        <div className="flex gap-2 items-center">
                            <div className="flex text-xs px-2 py-1 rounded-md">{transaction.transaction_type}</div>

                            <div className="flex flex-col">
                                <span>{transaction.token_name}</span>
                                <span className="text-xs text-gray-500">{transaction.token_symbol}</span>
                            </div>
                        </div>

                        <div className="flex flex-col items-end">
                            <CurrencyText amoun={transaction.amount * transaction.token_price} />
                            <div className="text-xs text-gray-500">{transaction.amount} Tokens</div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default CryptoTransactionsDashboard;