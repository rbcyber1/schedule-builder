import type Class from "../../../../shared/types/class";
import type { CreditCategory } from "../../../../shared/types/class";

export function addClass(accessCode: string, classData: Class) {
    return fetch("/api/edit/class", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            access_code: accessCode,
            name: classData.name,
            crf_id: classData.crf_id.CRF_ID,
            credits: classData.credits,
            grade_level: classData.grade_level,
            is_weighted: classData.isWeighted,
            is_grade_required: classData.isGradeRequired,
            semester_restriction: classData.semesterRestriction,
            paired_with: classData.pairedWith,
        }),
    }).then((response) => {
        if (!response.ok) throw new Error("Failed to add class");
        return response.json();
    });
}

export function addPUSDCreditRequirement(
    accessCode: string,
    category: CreditCategory,
) {
    return fetch("/api/edit/credit/pusd", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            access_code: accessCode,
            requirement_name: category.name,
            credits: category.needed_credits,
        }),
    }).then((response) => {
        if (!response.ok)
            throw new Error("Failed to add PUSD credit requirement");
        return response.json();
    });
}

export function addCSUCreditRequirement(
    accessCode: string,
    category: CreditCategory,
) {
    return fetch("/api/edit/credit/csu", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            access_code: accessCode,
            requirement_name: category.name,
            credits: category.needed_credits,
        }),
    }).then((response) => {
        if (!response.ok)
            throw new Error("Failed to add CSU credit requirement");
        return response.json();
    });
}

export function deleteClass(accessCode: string, classId: number) {
    return fetch(`/api/edit/class/${encodeURIComponent(classId)}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ access_code: accessCode }),
    }).then((response) => {
        if (!response.ok) throw new Error("Failed to delete class");
        return response.json();
    });
}

export function deletePUSDCreditRequirement(
    accessCode: string,
    requirementName: string,
) {
    return fetch(
        `/api/edit/credit/pusd/${encodeURIComponent(requirementName)}`,
        {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ access_code: accessCode }),
        },
    ).then((response) => {
        if (!response.ok)
            throw new Error("Failed to delete PUSD credit requirement");
        return response.json();
    });
}

export function deleteCSUCreditRequirement(
    accessCode: string,
    requirementName: string,
) {
    return fetch(
        `/api/edit/credit/csu/${encodeURIComponent(requirementName)}`,
        {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ access_code: accessCode }),
        },
    ).then((response) => {
        if (!response.ok)
            throw new Error("Failed to delete CSU credit requirement");
        return response.json();
    });
}
