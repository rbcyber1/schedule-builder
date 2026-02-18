export function getClasses() {
    return fetch("/api/get/classes")
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to fetch classes");
            }
            return response.json();
        })
        .catch((error) => {
            console.error("Error fetching classes:", error);
            throw error;
        });
}

export function getPUSDCreditRequirements() {
    return fetch("/api/get/credits/pusd")
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to fetch PUSD credit requirements");
            }
            return response.json();
        })
        .catch((error) => {
            console.error("Error fetching PUSD credit requirements:", error);
            throw error;
        });
}

export function getCSUCreditRequirements() {
    return fetch("/api/get/credits/csu")
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to fetch CSU credit requirements");
            }
            return response.json();
        })
        .catch((error) => {
            console.error("Error fetching CSU credit requirements:", error);
            throw error;
        });
}
