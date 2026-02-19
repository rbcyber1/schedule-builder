import type { ClassesResponse } from "../../../shared/types/web";
import { queueOperation } from "../utils/operations";
import "../styles/ClassList.css";

export default function ClassListing({
    id,
    name,
    crf_id,
    credits,
    grade_level,
    is_weighted,
    is_grade_required,
    semester_restriction,
    paired_with,
    pusd_credit_category,
    csu_credit_category,
}: ClassesResponse) {
    return (
        <div className="class-list-item">
            <span className="class-list-item-id">#{id}</span>
            <span className="class-list-item-crf">{crf_id}</span>
            <span className="class-list-item-name">{name}</span>
            <span className="class-list-item-grade">Gr. {grade_level}</span>
            {is_weighted && <span className="class-list-item-badge">W</span>}
            {is_grade_required && (
                <span className="class-list-item-badge">GR</span>
            )}
            {semester_restriction && (
                <span className="class-list-item-badge">
                    {semester_restriction === 1 ? "Fall" : "Spring"}
                </span>
            )}
            {paired_with && (
                <span className="class-list-item-badge">
                    Paired: #{paired_with}
                </span>
            )}
            {pusd_credit_category.length > 0 && (
                <span className="class-list-item-badge">
                    PUSD: {pusd_credit_category.map((c) => c.name).join(", ")}
                </span>
            )}
            {csu_credit_category.length > 0 && (
                <span className="class-list-item-badge">
                    CSU: {csu_credit_category.map((c) => c.name).join(", ")}
                </span>
            )}
            <span className="class-list-item-credits">{credits} cr</span>
            <div className="class-list-item-button">
                <button
                    className="delete-button"
                    onClick={() =>
                        queueOperation({ type: "delete-class", classId: id })
                    }
                >
                    X
                </button>
            </div>
        </div>
    );
}
