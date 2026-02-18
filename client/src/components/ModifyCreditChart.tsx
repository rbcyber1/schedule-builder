import { useState, useEffect } from "react";
import {
    getPUSDCreditRequirements,
    getCSUCreditRequirements,
} from "../utils/db/getData";

export default function ModifyCreditChart() {
    const [pusd, setPusd] = useState<Record<string, number>>({});
    const [csu, setCsu] = useState<Record<string, number>>({});

    useEffect(() => {
        getPUSDCreditRequirements().then(setPusd);
        getCSUCreditRequirements().then(setCsu);
    }, []);

    return (
        <div>
            <h1>Modify Credit Chart</h1>
            <h2>PUSD Credit Requirements</h2>
            {Object.entries(pusd).map(([name, credits]) => (
                <p key={name}>
                    {name}: {credits}
                </p>
            ))}
            <h2>CSU Credit Requirements</h2>
            {Object.entries(csu).map(([name, credits]) => (
                <p key={name}>
                    {name}: {credits}
                </p>
            ))}
        </div>
    );
}
