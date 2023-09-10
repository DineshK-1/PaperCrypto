import { useEffect, useState } from "react";

const CurrencyText = ({ amoun }) => {

    const [amount, setAmount] = useState();

    useEffect(() => {
        amoun = parseFloat(amoun);
        if (amoun > 100000) {
            amoun = parseInt(amoun);
        } else {
            amoun = amoun.toFixed(2);
        }
        setAmount(amoun.toLocaleString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    }, [amoun])

    return (
        <div className="currency-text">
            ${amount}
        </div>
    )
}

export default CurrencyText;