import { NavLink } from "react-router-dom";
import "../styles/Header.css";

export default function Header() {
    return (
        <header>
            <div className="nav-buttons">
                <NavLink to="/">Home</NavLink>
                <br />
                <NavLink to="/links">Links</NavLink>
            </div>
            <div className="socials">
                <a
                    href="https://www.instagram.com/rbhscyber"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <img
                        className="social-icon"
                        src="/instagram.svg"
                        alt="Instagram"
                    />
                </a>
                <a
                    href="https://github.com/rbcyber1"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <img
                        className="social-icon"
                        src="/github.svg"
                        alt="GitHub"
                    />
                </a>
                <a
                    href="https://discord.gg/SqctanM3b7"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <img
                        className="social-icon"
                        src="/discord.svg"
                        alt="Discord"
                    />
                </a>
            </div>
        </header>
    );
}
