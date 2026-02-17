import pool from "./pool.js";

export const createTables = async () => {
    await pool.execute(`
        CREATE TABLE IF NOT EXISTS pusd_credits (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL UNIQUE,
            needed_credits INT NOT NULL
        )
    `);

    await pool.execute(`
        CREATE TABLE IF NOT EXISTS csu_credits (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL UNIQUE,
            needed_credits INT NOT NULL
        )
    `);

    await pool.execute(`
        CREATE TABLE IF NOT EXISTS classes (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            crf_id CHAR(6) NOT NULL UNIQUE,
            credits INT NOT NULL,
            grade_level INT NOT NULL,
            is_weighted BOOLEAN NOT NULL DEFAULT FALSE,
            is_grade_required BOOLEAN NOT NULL DEFAULT FALSE,
            semester_restriction TINYINT DEFAULT NULL,
            paired_with INT DEFAULT NULL,
            FOREIGN KEY (paired_with) REFERENCES classes(id)
        )
    `);
};

export const addClass = async (
    name: string,
    crfId: string,
    credits: number,
    gradeLevel: number,
    isWeighted: boolean,
    isGradeRequired: boolean,
    semesterRestriction: number | null,
    pairedWith: number | null,
) => {
    await pool.execute(
        `INSERT INTO classes (name, crf_id, credits, grade_level, is_weighted, is_grade_required, semester_restriction, paired_with) VALUES (?, ?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE name = VALUES(name), credits = VALUES(credits), grade_level = VALUES(grade_level), is_weighted = VALUES(is_weighted), is_grade_required = VALUES(is_grade_required), semester_restriction = VALUES(semester_restriction), paired_with = VALUES(paired_with)`,
        [
            name,
            crfId,
            credits,
            gradeLevel,
            isWeighted,
            isGradeRequired,
            semesterRestriction,
            pairedWith,
        ],
    );
};

export const addCreditRequirement = async (
    table: "pusd_credits" | "csu_credits",
    name: string,
    neededCredits: number,
) => {
    await pool.execute(
        `INSERT INTO ${table} (name, needed_credits) VALUES (?, ?) ON DUPLICATE KEY UPDATE needed_credits = VALUES(needed_credits)`,
        [name, neededCredits],
    );
};
