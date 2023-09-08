import { Link } from "react-router-dom";

const NavBar = () => {
    return(
        <div className="navbar flex gap-3 p-4 items-center w-full justify-center">
            <Link to="/"><div className="nav-item">Home</div></Link>
            <Link to="/Cryptos"><div className="nav-item">Cryptocurrencies</div></Link>
            <div className="nav-item">Login/signup</div>
        </div>
    )
}

export default NavBar;