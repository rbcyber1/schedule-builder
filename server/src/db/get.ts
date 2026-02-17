import { CreditCategory } from "../../../shared/types/class.js";
import { ClassesResponse } from "../types/web.js";
import pool from "./pool.js";

export const getCreditTable = async (
    tableName: "pusd_credits" | "csu_credits",
) => {
    const result = await pool.execute(
        `SELECT name, needed_credits FROM ${tableName}`,
    );

    return (result[0] as CreditCategory[]).reduce(
        (acc, { name, needed_credits }) => {
            acc[name] = needed_credits;
            return acc;
        },
        {} as Record<string, number>,
    );
};

export const getClasses = async () => {
    const result = await pool.execute(
        `SELECT id, name, crf_id, credits, grade_level, is_weighted, is_grade_required, semester_restriction, paired_with FROM classes`,
    );

    return result[0] as ClassesResponse[];
};
