import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

import { createTables } from "./db/edit.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "../config/.env") });

const app = express();
const PORT = process.env.SCHEDULE_BUILDER_PORT || 8000;

app.use(express.json());

createTables().catch((err) => {
    console.error("Error creating tables:", err);
    process.exit(1);
}); // DB must be initialized before the server starts.

if (process.env.NODE_ENV === "production") {
    const clientPath = path.join(__dirname, "../../client/dist");
    app.use(express.static(clientPath));

    app.get(/(.*)/, (_, res) => {
        res.sendFile(path.join(clientPath, "index.html"));
    });
}

app.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`);
});
