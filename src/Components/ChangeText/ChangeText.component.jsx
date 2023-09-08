import { useState } from "react";

const ChangeText = ({ percent }) => {

    const [change, setChange] = useState(parseFloat(percent));

    return (
        <div className={"change-text" + (change>=0 ? " profit-color" : " loss-color")}>
            {change}
        </div>
    )
}

export default ChangeText;