import { Routes, Route } from "react-router-dom";

import Layout from "./Layout";

import Home from "./pages/Home";
import Links from "./pages/Links";
import NotFound from "./pages/NotFound";

import "./styles/App.css";

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="links" element={<Links />} />
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    );
}
