import { Outlet } from "react-router-dom";

import Footer from "./components/Footer";

export default function Layout() {
    return (
        <div className="layout-container">
            <main className="main-content">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}
