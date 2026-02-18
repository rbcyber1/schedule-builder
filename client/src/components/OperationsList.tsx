import "../styles/OperationsList.css";

export default function OperationsList() {
    return (
        <div className="operations-list-container">
            <div className="operations-list-header">
                <h2>Queued Operations</h2>
            </div>
            <div className="operations-list">
                <div className="operations-list-empty">
                    No operations queued
                </div>
            </div>
        </div>
    );
}
