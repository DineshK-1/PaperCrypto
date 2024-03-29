import { Fragment, useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { UserContext } from "../../Contexts/user.context";
import { FaMoon, FaSun } from "react-icons/fa";
import { IoSunnySharp } from "react-icons/io5";

const NavBar = () => {
    const { user } = useContext(UserContext);
    const location = useLocation();

    const [darkMode, setDarkMode] = useState(true);

    useEffect(() => {
        if (darkMode) {
            document.querySelector("body").setAttribute("data-theme", "dark");
        } else {
            document.querySelector("body").setAttribute("data-theme", "light");
        }
    }, [darkMode])

    return (
        <Fragment>
            <div className="navbar flex gap-3 p-4 items-center w-full justify-end">
                <button onClick={() => { setDarkMode((e) => !e) }}>{
                    darkMode ? <FaMoon /> : <IoSunnySharp />}
                </button>
                <Link to="/"><div className={"nav-item" + (location.pathname === "/" ? " active" : "")}>Home</div></Link>
                {user &&
                    <Link to="/Dashboard"><div className={"nav-item" + (location.pathname === "/Dashboard" ? " active" : "")}>Dashboard</div></Link>
                }
                <Link to="/Cryptos"><div className={"nav-item" + (location.pathname.includes("/Cryptos") ? " active" : "")}>Cryptocurrencies</div></Link>
                {user ?
                    <Link to="/Profile"><img className="rounded-xl" src={user.photoURL} width={40} /></Link>
                    :
                    <Link to="/Auth"><div className={"nav-item" + (location.pathname === "/Auth" ? " active" : "")}>Login/signup</div></Link>
                }

            </div>
        </Fragment>
    )
}

export default NavBar;