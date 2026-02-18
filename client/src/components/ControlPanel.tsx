import { useState } from "react";

export default function ControlPanel() {
    const [accessCode, setAccessCode] = useState("");
    return (
        <div className="control-panel">
            <div className="operation-list"></div>
            <div className="set-access-code">
                <input
                    type="text"
                    value={accessCode}
                    onChange={(e) => setAccessCode(e.target.value)}
                    placeholder="Enter Access Code"
                />
            </div>
        </div>
    );
}
