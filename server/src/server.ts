import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

import { createTables } from "./db/edit.js";
import logger from "./middleware/logger.js";

import getDBRoutes from "./routes/getDB.js";
import editDBRoutes from "./routes/editDB.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Resolve the server/ directory regardless of whether we're running from
// source (server/src/) or compiled output (server/dist/server/src/).
const serverRoot =
    __dirname.includes("dist") ?
        path.resolve(__dirname, "../../..")
    :   path.resolve(__dirname, "..");

dotenv.config({ path: path.join(serverRoot, "config/.env") });

const app = express();
const PORT = process.env.SCHEDULE_BUILDER_PORT || 8000;

app.use(express.json());
app.use(logger);

app.use("/api/get", getDBRoutes);
app.use("/api/edit", editDBRoutes);

createTables().catch((err) => {
    console.error("Error creating tables:", err);
    process.exit(1);
}); // DB must be initialized before the server starts.

if (process.env.NODE_ENV === "production") {
    const clientPath = path.resolve(serverRoot, "../client/dist");
    app.use(express.static(clientPath));

    app.get(/(.*)/, (_, res) => {
        res.sendFile(path.join(clientPath, "index.html"));
    });
}

app.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`);
});
