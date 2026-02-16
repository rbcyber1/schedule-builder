import reactLogo from "/react.svg";
import viteLogo from "/vite.svg";
import "../styles/App.css";

export default function Home() {
    return (
        <>
            <div>
                <a href="https://vite.dev" target="_blank">
                    <img src={viteLogo} className="logo" alt="Vite logo" />
                </a>
                <a href="https://react.dev" target="_blank">
                    <img
                        src={reactLogo}
                        className="logo react"
                        alt="React logo"
                    />
                </a>
            </div>
            <h1>RBHS Schedule Builder</h1>
            <div className="card">
                <p>Currently under maintenance. Please check back later.</p>
            </div>
        </>
    );
}
