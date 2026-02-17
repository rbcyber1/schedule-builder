export interface CreditResponse {
    [key: string]: unknown;
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
}

export interface ErrorResponse {
    error: string;
}

export interface MessageResponse {
    message: string;
}
