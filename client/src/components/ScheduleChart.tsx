import "../styles/ScheduleChart.css";

const GRADES = ["9th Grade", "10th Grade", "11th Grade", "12th Grade"];
const QUARTERS = ["Q1", "Q2", "Q3", "Q4"];
const SLOTS_PER_QUARTER = 4;

export default function ScheduleChart() {
    return (
        <div className="schedule-chart">
            <div className="schedule-chart-grid">
                <div className="schedule-quarter-header">
                    <div className="schedule-corner" />
                    {QUARTERS.map((q) => (
                        <div key={q} className="schedule-quarter-label">
                            {q}
                        </div>
                    ))}
                </div>
                {GRADES.map((grade) => (
                    <div key={grade} className="schedule-grade-row">
                        <div className="schedule-grade-label">{grade}</div>
                        {QUARTERS.map((q) => (
                            <div key={q} className="schedule-quarter-slots">
                                {Array.from(
                                    { length: SLOTS_PER_QUARTER },
                                    (_, i) => (
                                        <div
                                            key={i}
                                            className="schedule-slot"
                                        />
                                    ),
                                )}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}
