import { useContext, useRef } from "react"
import { UserContext } from "../../Contexts/user.context"
import { addMoneyDB } from "../../Helpers/API_Calls";

const AddMoney = ({ setModal }) => {

    const { user, setRefresh } = useContext(UserContext);

    const moneyRef = useRef();

    const addMoneyFunction = () => {
        addMoneyDB(user.uid, moneyRef.current.value).then((res) => {
            if (res.status == "Success") {
                setModal(false);
            }
        }).finally(() => {
            setRefresh((e) => !e)
        })
    }

    return (
        <div className="modal-blur">
            <div className="flex card login-container p-4 gap-4 flex-col">
                <div className="flex items-center justify-between gap-4">
                    <span className="text-lg">Add money to your balance</span>
                    <span className="material-symbols-outlined cursor-pointer bg-red-800 rounded-lg p-2 text-white"
                        onClick={() => { setModal(false) }}>close</span>
                </div>


                <input type="text" placeholder="Enter deposit amount" className="w-full" ref={moneyRef} />

                <button type="submit" className="login" onClick={() => {
                    addMoneyFunction();
                }}>Add funds</button>
            </div>
        </div>

    )
}

export default AddMoney;