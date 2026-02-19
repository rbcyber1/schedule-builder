import { useState } from "react";

import { submitOperations } from "../utils/operations";

import "../styles/ControlPanel.css";

export default function ControlPanel() {
    const [accessCode, setAccessCode] = useState("");
    const [response, setResponse] = useState("No response yet.");
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async () => {
        setSubmitting(true);
        setResponse("Submitting operations...");
        try {
            const results = await submitOperations(accessCode);
            if (results.length === 0) {
                setResponse("No operations to submit.");
            } else {
                setResponse(results.join("\n"));
            }
        } catch {
            setResponse("Error submitting operations.");
        } finally {
            setSubmitting(false);
        }
    };

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
                    disabled={!accessCode || submitting}
                    onClick={handleSubmit}
                >
                    {submitting ? "Submitting..." : "Submit"}
                </button>
            </div>
        </div>
    );
}
