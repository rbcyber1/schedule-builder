import CRFID from "./crfid";

export default interface Class {
    name: string;
    crf_id: CRFID;
    credits: number;
    pusd_credit_category: CreditCategory[]; // Default to fill first credit category, then fill the next if the first one is maxxed out
    csu_credit_category: CreditCategory[]; // Default to fill first credit category, then fill the next if the first one is maxxed out
    prerequisites: Class[];
    pairedWith: Class | null; // Only used for the first quarter of the paired class (e.g. AP Physics 1A, not AP Physics 1B)
    grade_level: number;
    isWeighted: boolean;
    isGradeRequired: boolean; // Whether the class needs to be taken during the grade level specified by grade_level
    semesterRestriction: number | null; // 1 for fall only, 2 for spring only
}

export interface CreditCategory {
    name: string;
    needed_credits: number;
}
