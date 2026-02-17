import ScheduleChart from "../components/ScheduleChart";
import CreditChart from "../components/CreditChart";
import StatPanel from "../components/StatPanel";
import SettingsPanel from "../components/SettingsPanel";

import "../styles/App.css";

export default function Home() {
    return (
        <div className="schedule-builder-container">
            <div className="schedule-chart-container">
                <ScheduleChart />
            </div>
            <div className="credit-chart-container">
                <CreditChart />
                <CreditChart />
            </div>
            <div className="stats-panel">
                <StatPanel />
            </div>
            <div className="settings-panel">
                <SettingsPanel />
            </div>
        </div>
    );
}
