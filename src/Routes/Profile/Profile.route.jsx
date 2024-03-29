import { useContext, useEffect } from "react";
import { signOutOfApp } from "../../Utils/firebase";
import { UserContext } from "../../Contexts/user.context";
import { useNavigate } from "react-router";

const ProfileRoute = () => {

    const { user, setUserCreated, setDBUser } = useContext(UserContext);

    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/Auth")
        }
    }, [user])

    if (!user) {
        return <span>Loading</span>
    }

    return (
        <div className="profile-route flex w-full h-screen justify-center items-center flex-col gap-4">
            <div className="flex flex-col  gap-4  p-6 rounded-xl bg-gray-900">
                <h2>Hello, {user?.displayName}</h2>
                <input type="text" value={user?.email} className="input" disabled />
                <button className="login" onClick={() => {
                    signOutOfApp()
                    setUserCreated(false)
                    setDBUser(null)
                }}>Logout</button>
            </div>
        </div>
    )
}

export default ProfileRoute;