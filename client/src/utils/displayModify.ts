import type {
    ClassesResponse,
    CreditResponse,
} from "../../../shared/types/web";
import {
    getClasses,
    getPUSDCreditRequirements,
    getCSUCreditRequirements,
} from "./db/getData";

export async function displayClasses(
    callback: (classes: ClassesResponse[]) => void,
) {
    try {
        const classes = await getClasses();
        callback(classes);
    } catch (error) {
        console.error("Error displaying classes:", error);
    }
}

export async function displayPUSDCreditRequirements(
    callback: (requirements: CreditResponse) => void,
) {
    try {
        const requirements = await getPUSDCreditRequirements();
        callback(requirements);
    } catch (error) {
        console.error("Error displaying PUSD credit requirements:", error);
    }
}

export async function displayCSUCreditRequirements(
    callback: (requirements: CreditResponse) => void,
) {
    try {
        const requirements = await getCSUCreditRequirements();
        callback(requirements);
    } catch (error) {
        console.error("Error displaying CSU credit requirements:", error);
    }
}
