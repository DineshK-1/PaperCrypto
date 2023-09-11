import { useContext } from "react";
import { signInwithGooglePopup } from "../../Utils/firebase";
import { UserContext } from "../../Contexts/user.context";
import { useNavigate } from "react-router";

const AuthRoute = () => {

    const { user } = useContext(UserContext)
    const navigate = useNavigate();

    // if (user) {
    //     return navigate("/")
    // }

    return (
        <div className="flex login-container">
            <div className="auth flex flex-col justify-center gap-4 p-5 w-max items-center card">
                <div className="text-lg">Login</div>
                <button className="login" onClick={() => { signInwithGooglePopup() }}>Sign in with google</button>
                <input type="text" placeholder="Email" />
                <input type="password" placeholder="Password" />
                <button className="login">Login</button>
                <button>Not a member? Signup</button>
            </div>
        </div>
    )
}

export default AuthRoute;