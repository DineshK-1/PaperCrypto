import { useContext, useRef } from "react"
import { UserContext } from "../../Contexts/user.context";
import { useNavigate } from "react-router";
import { CreateUserinDB } from "../../Helpers/API_Calls";

export const CreateDBUser = () => {

    const { user } = useContext(UserContext);

    const navigate = useNavigate();

    const FNameRef = useRef();
    const LNameRef = useRef();
    const PhoneRef = useRef();

    const CreateUser = () => {
        CreateUserinDB(user.uid, FNameRef.current.value, LNameRef.current.value, user.email, PhoneRef.current.value).then(() => {
            navigate("/Dashboard")
        })
    }

    return (
        <div className="flex flex-col login-container  gap-2">
            <span>Complete Registeration</span>

            <input ref={FNameRef} type="text" placeholder="First Name" />
            <input ref={LNameRef} type="text" placeholder="Last Name" />
            <input ref={PhoneRef} type="text" placeholder="Phone" />

            <button className="login" onClick={CreateUser}>Submit Info</button>
        </div>
    )
}