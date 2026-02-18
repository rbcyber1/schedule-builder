import { Request, Response } from "express";

import {
    addClass,
    addCreditRequirement,
    deleteClass,
    deleteCreditRequirement,
} from "../db/edit.js";
import {
    CreditResponse,
    ClassesResponse,
    ErrorResponse,
    MessageResponse,
} from "../types/web.js";

const ACCESS_CODE = process.env.SB_ACCESS_CODE;

export const addSpecifiedClass = async (
    req: Request,
    res: Response<MessageResponse | ErrorResponse>,
): Promise<void> => {
    try {
        const { access_code } = req.body;
        if (access_code !== ACCESS_CODE) {
            res.status(401).json({ error: "Unauthorized" });
            return;
        }
        const {
            name,
            crf_id,
            credits,
            grade_level,
            is_weighted,
            is_grade_required,
            semester_restriction,
            paired_with,
        } = req.body;
        await addClass(
            name,
            crf_id,
            credits,
            grade_level,
            is_weighted,
            is_grade_required,
            semester_restriction,
            paired_with,
        );
        res.status(201).json({ message: "Class added successfully" });
    } catch (err) {
        console.error("Error adding class:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const addPUSDCreditRequirement = async (
    req: Request,
    res: Response<CreditResponse | ErrorResponse>,
): Promise<void> => {
    try {
        const { access_code } = req.body;
        if (access_code !== ACCESS_CODE) {
            res.status(401).json({ error: "Unauthorized" });
            return;
        }
        const { requirement_name, credits } = req.body;
        await addCreditRequirement("pusd_credits", requirement_name, credits);
        res.status(201).json({
            message: "PUSD credit requirement added successfully",
        });
    } catch (err) {
        console.error("Error adding PUSD credit requirement:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const addCSUCreditRequirement = async (
    req: Request,
    res: Response<CreditResponse | ErrorResponse>,
): Promise<void> => {
    try {
        const { access_code } = req.body;
        if (access_code !== ACCESS_CODE) {
            res.status(401).json({ error: "Unauthorized" });
            return;
        }
        const { requirement_name, credits } = req.body;
        await addCreditRequirement("csu_credits", requirement_name, credits);
        res.status(201).json({
            message: "CSU credit requirement added successfully",
        });
    } catch (err) {
        console.error("Error adding CSU credit requirement:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const deleteSpecifiedClass = async (
    req: Request,
    res: Response<CreditResponse | ErrorResponse>,
): Promise<void> => {
    try {
        const { access_code } = req.body;
        if (access_code !== ACCESS_CODE) {
            res.status(401).json({ error: "Unauthorized" });
            return;
        }
        const class_id = req.params.class_id as string;
        await deleteClass(parseInt(class_id));
        res.json({ message: "Class deleted successfully" });
    } catch (err) {
        console.error("Error deleting class:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const deletePUSDCreditRequirement = async (
    req: Request,
    res: Response<CreditResponse | ErrorResponse>,
): Promise<void> => {
    try {
        const { access_code } = req.body;
        if (access_code !== ACCESS_CODE) {
            res.status(401).json({ error: "Unauthorized" });
            return;
        }
        const requirement_name = req.params.requirement_name as string;
        await deleteCreditRequirement("pusd_credits", requirement_name);
        res.json({ message: "PUSD credit requirement deleted successfully" });
    } catch (err) {
        console.error("Error deleting PUSD credit requirement:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const deleteCSUCreditRequirement = async (
    req: Request,
    res: Response<CreditResponse | ErrorResponse>,
): Promise<void> => {
    try {
        const { access_code } = req.body;
        if (access_code !== ACCESS_CODE) {
            res.status(401).json({ error: "Unauthorized" });
            return;
        }
        const requirement_name = req.params.requirement_name as string;
        await deleteCreditRequirement("csu_credits", requirement_name);
        res.json({ message: "CSU credit requirement deleted successfully" });
    } catch (err) {
        console.error("Error deleting CSU credit requirement:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};
