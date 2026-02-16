import { Outlet } from "react-router-dom";

import Corner from "./components/Corner";
import Header from "./components/Header";
import Footer from "./components/Footer";

import "./styles/Layout.css";

export default function Layout() {
    return (
        <div className="layout-container">
            <Corner />
            <Header />
            <main className="main-content">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}
