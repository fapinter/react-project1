import { Link } from "react-router-dom";
import "../assets/css/header.css";

function Header(){

    return (
        <header className="header-page">
            <div className="header-left"/>
            <div className="header-right">
                <nav className="redirect">
                    <Link className="link" to="/">Home</Link>
                    <Link className="link" to="/edit">Edit</Link>
                    <Link className="link" to="/details">Details</Link>
                </nav>
            </div>
        </header>
    )
}


export default Header;