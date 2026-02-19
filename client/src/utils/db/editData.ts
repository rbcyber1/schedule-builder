import type Class from "../../../../shared/types/class";
import type { ClassCreditCategory } from "../../../../shared/types/web";
import { addOperation } from "../operations";

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
            pusd_credit_category: classData.pusd_credit_category,
            csu_credit_category: classData.csu_credit_category,
        }),
    }).then((response) => {
        if (!response.ok) throw new Error("Failed to add class");
        addOperation(`Added class: ${classData.name}`);
        return response.json();
    });
}

export function addPUSDCreditRequirement(
    accessCode: string,
    category: ClassCreditCategory,
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
        addOperation(`Added PUSD credit requirement: ${category.name}`);
        return response.json();
    });
}

export function addCSUCreditRequirement(
    accessCode: string,
    category: ClassCreditCategory,
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
        addOperation(`Added CSU credit requirement: ${category.name}`);
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
        addOperation(`Deleted class #${classId}`);
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
        addOperation(`Deleted PUSD credit requirement: ${requirementName}`);
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
        addOperation(`Deleted CSU credit requirement: ${requirementName}`);
        return response.json();
    });
}
