import { useState } from "react";

import { checkDB } from "../utils/health";

import "../styles/ControlPanel.css";

export default function ControlPanel() {
    const [accessCode, setAccessCode] = useState("");
    const [response, setResponse] = useState("No response yet.");
    return (
        <div className="control-panel">
            <div className="control-panel-left">
                <div className="response-area">
                    <code className="response-text">{response}</code>
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
                <button
                    className="submit-button"
                    disabled={!accessCode}
                    onClick={() => checkDB(accessCode, setResponse)}
                >
                    Submit
                </button>
            </div>
        </div>
    );
}
