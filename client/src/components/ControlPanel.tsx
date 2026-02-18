import { useState } from "react";

import "../styles/ControlPanel.css";

export default function ControlPanel() {
    const [accessCode, setAccessCode] = useState("");
    return (
        <div className="control-panel">
            <div className="control-panel-left">
                <div className="operation-list">
                    <span className="operation-label">
                        No pending operations
                    </span>
                </div>
            </div>
            <div className="control-panel-right">
                <input
                    className="access-code-input"
                    type="password"
                    value={accessCode}
                    onChange={(e) => setAccessCode(e.target.value)}
                    placeholder="Access Code"
                />
                <button className="submit-button" disabled={!accessCode}>
                    Submit
                </button>
            </div>
        </div>
    );
}
