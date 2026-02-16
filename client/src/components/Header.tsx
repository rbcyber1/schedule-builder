import { NavLink } from "react-router-dom";
import "../styles/Header.css";

export default function Header() {
    return (
        <header>
            <div className="nav-buttons">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/links">Links</NavLink>
            </div>
        </header>
    );
}
