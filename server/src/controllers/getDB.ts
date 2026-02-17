import { Request, Response } from "express";

import { getCreditTable, getClasses } from "../db/get.js";
import {
    CreditResponse,
    ClassesResponse,
    ErrorResponse,
} from "../types/web.js";

export const getPUSDCredits = async (
    req: Request,
    res: Response<CreditResponse | ErrorResponse>,
): Promise<void> => {
    try {
        const credits = await getCreditTable("pusd_credits");
        res.json(credits);
    } catch (err) {
        console.error("Error fetching PUSD credits:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const getCSUCredits = async (
    req: Request,
    res: Response<CreditResponse | ErrorResponse>,
): Promise<void> => {
    try {
        const credits = await getCreditTable("csu_credits");
        res.json(credits);
    } catch (err) {
        console.error("Error fetching CSU credits:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const getAllClasses = async (
    req: Request,
    res: Response<ClassesResponse[] | ErrorResponse>,
): Promise<void> => {
    try {
        const classes = await getClasses();
        res.json(classes);
    } catch (err) {
        console.error("Error fetching classes:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};
