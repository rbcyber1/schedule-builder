import ScheduleChart from "../components/ScheduleChart";
import PUSDCreditChart from "../components/PUSDCreditChart";
import CSUCreditChart from "../components/CSUCreditChart";
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
                <PUSDCreditChart />
                <CSUCreditChart />
            </div>
            <div className="stats-panel-container">
                <StatPanel />
            </div>
            <div className="settings-panel-container">
                <SettingsPanel />
            </div>
        </div>
    );
}
