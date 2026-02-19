import getPool from "./pool.js";

export class ValidationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "ValidationError";
    }
}

export const verifyCreditCategoryExists = async (
    table: "pusd_credits" | "csu_credits",
    name: string,
) => {
    const result = await getPool().execute(
        `SELECT needed_credits FROM ${table} WHERE name = ?`,
        [name],
    );

    const rows = result[0] as any[];
    if (rows.length === 0) {
        throw new ValidationError(
            `Credit category "${name}" does not exist in ${table}`,
        );
    }

    return (rows[0] as { needed_credits: number }).needed_credits;
};
