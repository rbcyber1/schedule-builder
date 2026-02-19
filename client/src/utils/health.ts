export function checkDB(
    accessCode: string,
    callback: (response: string) => void,
) {
    fetch("/api/health/db", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accessCode }),
    })
        .then((res) => res.json())
        .then((data) => {
            console.log("DB Check Response:", data);
            callback(data.message);
        })
        .catch((err) => {
            console.error("Error checking DB:", err);
            callback("Error checking DB. See console for details.");
        });
}
