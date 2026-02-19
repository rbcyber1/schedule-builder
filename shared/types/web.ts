export interface CreditResponse {
    [key: string]: unknown;
}

export interface ClassCreditCategory {
    name: string;
    needed_credits: number;
}

export interface ClassesResponse {
    id: number;
    name: string;
    crf_id: string;
    credits: number;
    grade_level: number;
    is_weighted: boolean;
    is_grade_required: boolean;
    semester_restriction: number | null;
    paired_with: number | null;
    pusd_credit_category: ClassCreditCategory[];
    csu_credit_category: ClassCreditCategory[];
}

export interface ErrorResponse {
    error: string;
}

export interface MessageResponse {
    message: string;
}

export interface HealthResponse {
    status: string;
    message: string;
    error?: string;
}
