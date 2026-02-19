import { useState, useEffect } from "react";

import {
    getOperations,
    getOperationLabel,
    getOperationType,
    removeOperation,
    clearOperations,
} from "../utils/operations";
import type { Operation } from "../utils/operations";

import "../styles/OperationsList.css";

export default function OperationsList() {
    const [operations, setOperations] = useState<Operation[]>([]);

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
                <button
                    className="clear-operations-button"
                    onClick={() => clearOperations()}
                >
                    Clear Operations
                </button>
            </div>
            <div className="operations-list">
                {operations.length === 0 ?
                    <div className="operations-list-empty">
                        No operations queued
                    </div>
                :   operations.map((op, i) => (
                        <div key={i} className="operation-item">
                            <span
                                className={`operation-item-type op-${getOperationType(op)}`}
                            >
                                {getOperationType(op)}
                            </span>
                            <span className="operation-item-label">
                                {getOperationLabel(op)}
                            </span>
                            <button
                                className="operation-item-remove"
                                onClick={() => removeOperation(i)}
                            >
                                &times;
                            </button>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}
