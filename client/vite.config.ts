import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import dotenv from "dotenv";
dotenv.config({ path: "./config/.env" });

const BACKEND_PORT = process.env.BACKEND_PORT || 8000;

export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            "/api": {
                target: `http://localhost:${BACKEND_PORT}`,
                changeOrigin: true,
            },
        },
    },
});
