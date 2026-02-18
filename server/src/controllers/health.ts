import { Request, Response } from "express";

import { HealthResponse } from "../types/web.js";
import pool from "../db/pool.js";

export function getDBHealth(req: Request, res: Response): void {
    if (req.body.accessCode !== process.env.SB_ACCESS_CODE) {
        res.status(403).json({
            status: "error",
            message: "Forbidden: Invalid access code.",
        } as HealthResponse);
        return;
    }

    pool()
        .query("SELECT 1")
        .then(() => {
            res.json({
                status: "ok",
                message: "Database connection is healthy.",
            } as HealthResponse);
        })
        .catch((err: Error) => {
            console.error("Database health check failed:", err);
            res.status(500).json({
                status: "error",
                message: "Database connection failed.",
                error: err.message,
            } as HealthResponse);
        });
}
