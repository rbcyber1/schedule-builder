import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "../config/.env") });

const app = express();
const PORT = process.env.SCHEDULE_BUILDER_PORT || 8000;

app.use(express.json());

app.get("/api/health", (_, res) => {
    res.json({ status: "ok" });
});

if (process.env.NODE_ENV === "production") {
    const clientPath = path.join(__dirname, "../../client/dist");
    app.use(express.static(clientPath));

    app.get(/(.*)/, (_, res) => {
        res.sendFile(path.join(clientPath, "index.html"));
    });
}

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
