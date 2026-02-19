import { useState, useEffect, useRef } from "react";

import type { CreditResponse } from "../../../shared/types/web";
import {
    displayPUSDCreditRequirements,
    displayCSUCreditRequirements,
} from "../utils/displayModify";
import { queueOperation } from "../utils/operations";

import "../styles/ModifyCreditChart.css";
import "../styles/Modal.css";

export default function ModifyCreditChart() {
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState<"pusd" | "csu">("pusd");
    const formRef = useRef<HTMLDivElement>(null);

    const [PUSDCredits, setPUSDCredits] = useState<CreditResponse>({});
    const [CSUCredits, setCSUCredits] = useState<CreditResponse>({});

    useEffect(() => {
        const fetchCredits = () => {
            displayPUSDCreditRequirements(setPUSDCredits);
            displayCSUCreditRequirements(setCSUCredits);
        };

        fetchCredits();
        window.addEventListener("updateDB", fetchCredits);
        return () => window.removeEventListener("updateDB", fetchCredits);
    }, []);

    const openModal = (type: "pusd" | "csu") => {
        setModalType(type);
        setShowModal(true);
    };

    const handleAddCredit = () => {
        if (!formRef.current) return;

        const inputs = formRef.current.querySelectorAll("input");
        const name = (inputs[0] as HTMLInputElement).value.trim();
        const credits = parseInt((inputs[1] as HTMLInputElement).value) || 0;

        if (!name || credits <= 0) return;

        queueOperation({
            type: modalType === "pusd" ? "add-pusd-credit" : "add-csu-credit",
            data: { name, needed_credits: credits },
        });

        setShowModal(false);
    };

    const handleDeleteCredit = (type: "pusd" | "csu", name: string) => {
        queueOperation({
            type: type === "pusd" ? "delete-pusd-credit" : "delete-csu-credit",
            name,
        });
    };

    return (
        <div className="modify-credit-charts-container">
            <div className="credit-section">
                <div className="credit-section-header">
                    <h2>PUSD Graduation Requirements</h2>
                    <button
                        className="add-credit-button"
                        onClick={() => openModal("pusd")}
                    >
                        Add Credit
                    </button>
                </div>
                <div className="credit-list pusd-chart">
                    {Object.entries(PUSDCredits).length === 0 ?
                        <div className="credit-list-empty">
                            No requirements available
                        </div>
                    :   Object.entries(PUSDCredits).map(([name, credits]) => (
                            <div key={name} className="credit-item">
                                <span className="credit-item-name">{name}</span>
                                <span className="credit-item-credits">
                                    {String(credits)}
                                </span>
                                <button
                                    className="credit-delete-button"
                                    onClick={() =>
                                        handleDeleteCredit("pusd", name)
                                    }
                                >
                                    X
                                </button>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className="credit-section">
                <div className="credit-section-header">
                    <h2>UC/CSU Credit Requirements</h2>
                    <button
                        className="add-credit-button"
                        onClick={() => openModal("csu")}
                    >
                        Add Credit
                    </button>
                </div>
                <div className="credit-list csu-chart">
                    {Object.entries(CSUCredits).length === 0 ?
                        <div className="credit-list-empty">
                            No requirements available
                        </div>
                    :   Object.entries(CSUCredits).map(([name, credits]) => (
                            <div key={name} className="credit-item">
                                <span className="credit-item-name">{name}</span>
                                <span className="credit-item-credits">
                                    {String(credits)}
                                </span>
                                <button
                                    className="credit-delete-button"
                                    onClick={() =>
                                        handleDeleteCredit("csu", name)
                                    }
                                >
                                    X
                                </button>
                            </div>
                        ))
                    }
                </div>
            </div>

            {showModal && (
                <div
                    className="modal-overlay"
                    onClick={() => setShowModal(false)}
                >
                    <div
                        className="modal modal-sm"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="modal-header">
                            <h3>
                                Add {modalType === "pusd" ? "PUSD" : "UC/CSU"}{" "}
                                Requirement
                            </h3>
                            <button
                                className="modal-close"
                                onClick={() => setShowModal(false)}
                            >
                                &times;
                            </button>
                        </div>
                        <div className="modal-body" ref={formRef}>
                            <div className="form-group">
                                <label>Requirement Name</label>
                                <input type="text" placeholder="e.g. English" />
                            </div>
                            <div className="form-group">
                                <label>Credits Needed</label>
                                <input
                                    type="number"
                                    placeholder="e.g. 40"
                                    min={0}
                                />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                className="modal-cancel"
                                onClick={() => setShowModal(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="modal-submit"
                                onClick={handleAddCredit}
                            >
                                Add Requirement
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
