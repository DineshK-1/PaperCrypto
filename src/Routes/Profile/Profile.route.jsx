import { signOutOfApp } from "../../Utils/firebase";

const ProfileRoute = () => {
    return(
        <div className="profile-route">
            <button className="login" onClick={() => {
                signOutOfApp()
            }}>Logout</button>
        </div>
    )
}

export default ProfileRoute;