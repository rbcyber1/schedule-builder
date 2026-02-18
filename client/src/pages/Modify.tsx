import ClassList from "../components/ClassList";
import ModifyCreditChart from "../components/ModifyCreditChart";
import ControlPanel from "../components/ControlPanel";

export default function Modify() {
    return (
        <div className="modify-page">
            <div className="modify-class-list">
                <ClassList />
            </div>
            <div className="modify-credit-chart">
                <ModifyCreditChart />
            </div>
            <div className="control-panel">
                <ControlPanel />
            </div>
        </div>
    );
}
