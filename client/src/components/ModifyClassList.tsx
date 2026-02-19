import { useState, useEffect, useRef } from "react";

import type { ClassesResponse } from "../../../shared/types/web";
import ClassListing from "./ClassListing";
import { queueOperation } from "../utils/operations";

import { displayClasses } from "../utils/displayModify";

import "../styles/ClassList.css";
import "../styles/Modal.css";

export default function ModifyClassList() {
    const [showModal, setShowModal] = useState(false);
    const [classes, setClasses] = useState<ClassesResponse[]>([]);
    const formRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchClasses = () => {
            displayClasses(setClasses);
        };

        fetchClasses();
        window.addEventListener("updateDB", fetchClasses);
        return () => window.removeEventListener("updateDB", fetchClasses);
    }, []);

    const handleAddClass = () => {
        if (!formRef.current) return;

        const inputs = formRef.current.querySelectorAll("input, select");
        const name = (inputs[0] as HTMLInputElement).value.trim();
        const crf_id = (inputs[1] as HTMLInputElement).value.trim();
        const credits = parseInt((inputs[2] as HTMLInputElement).value) || 0;
        const grade_level = parseInt((inputs[3] as HTMLSelectElement).value);
        const semesterVal = (inputs[4] as HTMLSelectElement).value;
        const is_weighted = (inputs[5] as HTMLInputElement).checked;
        const is_grade_required = (inputs[6] as HTMLInputElement).checked;
        const paired_with_val = (inputs[7] as HTMLInputElement).value;
        const pusd_cats = (inputs[8] as HTMLInputElement).value.trim();
        const csu_cats = (inputs[9] as HTMLInputElement).value.trim();

        if (!name || !crf_id) return;

        queueOperation({
            type: "add-class",
            data: {
                name,
                crf_id,
                credits,
                grade_level,
                is_weighted,
                is_grade_required,
                semester_restriction:
                    semesterVal ? parseInt(semesterVal) : null,
                paired_with: paired_with_val ? parseInt(paired_with_val) : null,
                pusd_credit_category:
                    pusd_cats ?
                        pusd_cats.split(",").map((s) => ({
                            name: s.trim(),
                            needed_credits: credits,
                        }))
                    :   [],
                csu_credit_category:
                    csu_cats ?
                        csu_cats.split(",").map((s) => ({
                            name: s.trim(),
                            needed_credits: credits,
                        }))
                    :   [],
            },
        });

        setShowModal(false);
    };

    useEffect(() => {
        const fetchClasses = () => {
            displayClasses(setClasses);
        };

        fetchClasses();
        window.addEventListener("updateDB", fetchClasses);
        return () => window.removeEventListener("updateDB", fetchClasses);
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
                {classes.length === 0 ?
                    <div className="class-list-empty">No classes available</div>
                :   classes.map((c) => <ClassListing key={c.id} {...c} />)}
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
                        <div className="modal-body" ref={formRef}>
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
                            <div className="form-group">
                                <label>PUSD Credit Categories</label>
                                <input
                                    type="text"
                                    placeholder="e.g. English, Math"
                                />
                            </div>
                            <div className="form-group">
                                <label>CSU Credit Categories</label>
                                <input
                                    type="text"
                                    placeholder="e.g. A-History, B-English"
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
                                onClick={handleAddClass}
                            >
                                Add Class
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
