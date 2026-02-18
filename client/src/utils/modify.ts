export function checkDB(
    accessCode: string,
    triggerFunction: (response: string) => void,
) {
    fetch("/api/health/db", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accessCode }),
    })
        .then((res) => res.json())
        .then((data) => {
            console.log("DB Check Response:", data);
            triggerFunction(data.message);
        })
        .catch((err) => {
            console.error("Error checking DB:", err);
            triggerFunction("Error checking DB. See console for details.");
        });
}
