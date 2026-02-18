import ModifyClassList from "../components/ModifyClassList";
import ModifyCreditChart from "../components/ModifyCreditChart";
import ControlPanel from "../components/ControlPanel";

import "../styles/ModifyPage.css";

export default function Modify() {
    return (
        <div className="modify-page">
            <div className="modify-main">
                <div className="modify-class-list">
                    <ModifyClassList />
                </div>
                <div className="modify-credit-chart">
                    <ModifyCreditChart />
                </div>
            </div>
            <div className="modify-control-panel">
                <ControlPanel />
            </div>
        </div>
    );
}
