import { useContext, useEffect } from "react";
import { signOutOfApp } from "../../Utils/firebase";
import { UserContext } from "../../Contexts/user.context";
import { useNavigate } from "react-router";

const ProfileRoute = () => {

    const { user } = useContext(UserContext);

    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/Auth")
        }
    }, [user])

    return (
        <div className="profile-route">
            <button className="login" onClick={() => {
                signOutOfApp()
            }}>Logout</button>
        </div>
    )
}

export default ProfileRoute;