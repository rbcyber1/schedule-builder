import { useState, useEffect } from "react";
import { getClasses } from "../utils/db/getData";

interface ClassEntry {
    id: number;
    name: string;
}

export default function ClassList() {
    const [classes, setClasses] = useState<ClassEntry[]>([]);

    useEffect(() => {
        getClasses().then(setClasses);
    }, []);

    return (
        <div>
            <h1>Class List</h1>
            {classes.map((c) => (
                <p key={c.id}>{c.name}</p>
            ))}
        </div>
    );
}
