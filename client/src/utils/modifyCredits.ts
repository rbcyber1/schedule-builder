import {
    addCSUCreditRequirement,
    addPUSDCreditRequirement,
    deletePUSDCreditRequirement,
    deleteCSUCreditRequirement,
} from "./db/editData";
import type { ClassCreditCategory } from "../../../shared/types/web";

export function addPUSDCreditRequirementWrapper(
    accessCode: string,
    category: ClassCreditCategory,
) {
    return addPUSDCreditRequirement(accessCode, category).catch((error) => {
        console.error("Error adding PUSD credit requirement:", error);
        throw error;
    });
}

export function addCSUCreditRequirementWrapper(
    accessCode: string,
    category: ClassCreditCategory,
) {
    return addCSUCreditRequirement(accessCode, category).catch((error) => {
        console.error("Error adding CSU credit requirement:", error);
        throw error;
    });
}

export function deletePUSDCreditRequirementWrapper(
    accessCode: string,
    requirementName: string,
) {
    return deletePUSDCreditRequirement(accessCode, requirementName).catch(
        (error) => {
            console.error("Error deleting PUSD credit requirement:", error);
            throw error;
        },
    );
}

export function deleteCSUCreditRequirementWrapper(
    accessCode: string,
    requirementName: string,
) {
    return deleteCSUCreditRequirement(accessCode, requirementName).catch(
        (error) => {
            console.error("Error deleting CSU credit requirement:", error);
            throw error;
        },
    );
}
