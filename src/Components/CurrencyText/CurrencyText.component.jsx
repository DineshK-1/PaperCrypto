import { useEffect, useState } from "react";

const CurrencyText = ({ amoun }) => {

    const [amount, setAmount] = useState();

    useEffect(() => {
        setAmount(parseFloat(amoun).toFixed(2).toLocaleString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    }, [amoun])

    return (
        <div className="currency-text">
            ${amount}
        </div>
    )
}

export default CurrencyText;