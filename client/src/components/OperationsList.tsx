import { useState, useEffect } from "react";

import { getOperations } from "../utils/operations";

import "../styles/OperationsList.css";

export default function OperationsList() {
    const [operations, setOperations] = useState<string[]>([]);

    useEffect(() => {
        const fetchOperations = () => {
            setOperations(getOperations());
        };

        fetchOperations();
        window.addEventListener("updateOperations", fetchOperations);
        return () =>
            window.removeEventListener("updateOperations", fetchOperations);
    }, []);

    return (
        <div className="operations-list-container">
            <div className="operations-list-header">
                <h2>Queued Operations</h2>
            </div>
            <div className="operations-list">
                {operations.length === 0 ?
                    <div className="operations-list-empty">
                        No operations queued
                    </div>
                :   operations.map((op, i) => (
                        <div key={i} className="operations-list-item">
                            {op}
                        </div>
                    ))
                }
            </div>
        </div>
    );
}
