import { useLocation } from "react-router-dom";
import "../styles/Corner.css";

export default function Corner() {
    const location = useLocation();
    return (
        <div className="corner">
            <div className="title-area">
                <img
                    className="logo"
                    src="/logo.png"
                    alt="Recolored RBHS Cybersecurity Club Logo"
                />
                <h2>
                    {location.pathname === "/modify" ?
                        <span className="warn">
                            This page is intended for developer use only.
                        </span>
                    :   "Welcome to RBHS Schedule Builder!"}
                </h2>
            </div>
        </div>
    );
}
