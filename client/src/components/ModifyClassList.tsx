import { useState, useEffect } from "react";
import ClassListing from "./ClassListing";
import { getClasses } from "../utils/db/getData";
import "../styles/ClassList.css";
import "../styles/Modal.css";

interface ClassEntry {
    id: number;
    name: string;
    crf_id: string;
    credits: number;
    is_weighted: boolean;
}

export default function ModifyClassList() {
    const [showModal, setShowModal] = useState(false);
    const [classes, setClasses] = useState<ClassEntry[]>([]);

    useEffect(() => {
        getClasses().then(setClasses);
    }, []);

    return (
        <div className="class-list-container">
            <div className="class-list-header">
                <h2>Classes</h2>
                <button
                    className="add-class-button"
                    onClick={() => setShowModal(true)}
                >
                    Add Class
                </button>
            </div>
            <div className="class-list">
                {classes.map((c) => (
                    <ClassListing
                        key={c.id}
                        id={c.id}
                        name={c.name}
                        crf_id={c.crf_id}
                        credits={c.credits}
                        is_weighted={c.is_weighted}
                    />
                ))}
            </div>

            {showModal && (
                <div
                    className="modal-overlay"
                    onClick={() => setShowModal(false)}
                >
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>Add Class</h3>
                            <button
                                className="modal-close"
                                onClick={() => setShowModal(false)}
                            >
                                &times;
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <label>Class Name</label>
                                <input
                                    type="text"
                                    placeholder="e.g. AP Physics 1A"
                                />
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>CRF ID</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. 012345"
                                        maxLength={6}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Credits</label>
                                    <input
                                        type="number"
                                        placeholder="5"
                                        min={0}
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Grade Level</label>
                                    <select>
                                        <option value="9">9</option>
                                        <option value="10">10</option>
                                        <option value="11">11</option>
                                        <option value="12">12</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Semester</label>
                                    <select>
                                        <option value="">Any</option>
                                        <option value="1">Fall Only</option>
                                        <option value="2">Spring Only</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group form-checkbox">
                                    <label>
                                        <input type="checkbox" />
                                        Weighted
                                    </label>
                                </div>
                                <div className="form-group form-checkbox">
                                    <label>
                                        <input type="checkbox" />
                                        Grade Required
                                    </label>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Paired With (Class ID)</label>
                                <input
                                    type="number"
                                    placeholder="Optional"
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
                            <button className="modal-submit">Add Class</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
