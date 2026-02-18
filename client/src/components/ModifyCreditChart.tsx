import { useState } from "react";
import "../styles/ModifyCreditChart.css";
import "../styles/Modal.css";

export default function ModifyCreditChart() {
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState<"pusd" | "csu">("pusd");

    const openModal = (type: "pusd" | "csu") => {
        setModalType(type);
        setShowModal(true);
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
                <div className="credit-list pusd-chart"></div>
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
                <div className="credit-list csu-chart"></div>
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
                        <div className="modal-body">
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
                            <button className="modal-submit">
                                Add Requirement
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
