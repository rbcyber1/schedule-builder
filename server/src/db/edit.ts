import getPool from "./pool.js";
import { ClassCreditCategory } from "../types/web.js";

export const createTables = async () => {
    await getPool().execute(`
        CREATE TABLE IF NOT EXISTS pusd_credits (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL UNIQUE,
            needed_credits INT NOT NULL
        )
    `);

    await getPool().execute(`
        CREATE TABLE IF NOT EXISTS csu_credits (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL UNIQUE,
            needed_credits INT NOT NULL
        )
    `);

    await getPool().execute(`
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

    await getPool().execute(`
        CREATE TABLE IF NOT EXISTS class_pusd_credits (
            class_id INT NOT NULL,
            credit_name VARCHAR(255) NOT NULL,
            needed_credits INT NOT NULL,
            PRIMARY KEY (class_id, credit_name),
            FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE CASCADE
        )
    `);

    await getPool().execute(`
        CREATE TABLE IF NOT EXISTS class_csu_credits (
            class_id INT NOT NULL,
            credit_name VARCHAR(255) NOT NULL,
            needed_credits INT NOT NULL,
            PRIMARY KEY (class_id, credit_name),
            FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE CASCADE
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
    pusdCreditCategory: ClassCreditCategory[],
    csuCreditCategory: ClassCreditCategory[],
) => {
    const pool = getPool();
    const [result] = await pool.execute(
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

    const classId = (result as { insertId: number }).insertId;

    await pool.execute(`DELETE FROM class_pusd_credits WHERE class_id = ?`, [
        classId,
    ]);
    await pool.execute(`DELETE FROM class_csu_credits WHERE class_id = ?`, [
        classId,
    ]);

    for (const cat of pusdCreditCategory) {
        await pool.execute(
            `INSERT INTO class_pusd_credits (class_id, credit_name, needed_credits) VALUES (?, ?, ?)`,
            [classId, cat.name, cat.needed_credits],
        );
    }

    for (const cat of csuCreditCategory) {
        await pool.execute(
            `INSERT INTO class_csu_credits (class_id, credit_name, needed_credits) VALUES (?, ?, ?)`,
            [classId, cat.name, cat.needed_credits],
        );
    }
};

export const addCreditRequirement = async (
    table: "pusd_credits" | "csu_credits",
    name: string,
    neededCredits: number,
) => {
    await getPool().execute(
        `INSERT INTO ${table} (name, needed_credits) VALUES (?, ?) ON DUPLICATE KEY UPDATE needed_credits = VALUES(needed_credits)`,
        [name, neededCredits],
    );
};

export const deleteClass = async (id: number) => {
    await getPool().execute(`DELETE FROM classes WHERE id = ?`, [id]);
};

export const deleteCreditRequirement = async (
    table: "pusd_credits" | "csu_credits",
    name: string,
) => {
    await getPool().execute(`DELETE FROM ${table} WHERE name = ?`, [name]);
};
