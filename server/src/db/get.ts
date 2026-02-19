import { ClassCreditCategory, ClassesResponse } from "../types/web.js";
import getPool from "./pool.js";

export const getCreditTable = async (
    tableName: "pusd_credits" | "csu_credits",
) => {
    const result = await getPool().execute(
        `SELECT name, needed_credits FROM ${tableName}`,
    );

    return (result[0] as { name: string; needed_credits: number }[]).reduce(
        (acc, { name, needed_credits }) => {
            acc[name] = needed_credits;
            return acc;
        },
        {} as Record<string, number>,
    );
};

export const getClasses = async () => {
    const pool = getPool();

    const [classes] = await pool.execute(
        `SELECT id, name, crf_id, credits, grade_level, is_weighted, is_grade_required, semester_restriction, paired_with FROM classes`,
    );

    const [pusdCredits] = await pool.execute(
        `SELECT class_id, credit_name, needed_credits FROM class_pusd_credits`,
    );

    const [csuCredits] = await pool.execute(
        `SELECT class_id, credit_name, needed_credits FROM class_csu_credits`,
    );

    const pusdByClass = new Map<number, ClassCreditCategory[]>();
    for (const row of pusdCredits as {
        class_id: number;
        credit_name: string;
        needed_credits: number;
    }[]) {
        const arr = pusdByClass.get(row.class_id) ?? [];
        arr.push({ name: row.credit_name, needed_credits: row.needed_credits });
        pusdByClass.set(row.class_id, arr);
    }

    const csuByClass = new Map<number, ClassCreditCategory[]>();
    for (const row of csuCredits as {
        class_id: number;
        credit_name: string;
        needed_credits: number;
    }[]) {
        const arr = csuByClass.get(row.class_id) ?? [];
        arr.push({ name: row.credit_name, needed_credits: row.needed_credits });
        csuByClass.set(row.class_id, arr);
    }

    return (
        classes as Omit<
            ClassesResponse,
            "pusd_credit_category" | "csu_credit_category"
        >[]
    ).map((c) => ({
        ...c,
        pusd_credit_category: pusdByClass.get(c.id) ?? [],
        csu_credit_category: csuByClass.get(c.id) ?? [],
    })) as ClassesResponse[];
};
