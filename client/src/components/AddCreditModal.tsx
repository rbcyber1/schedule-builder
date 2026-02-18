import "../styles/AddModal.css";

export default function AddCreditModal(credit_type: "pusd" | "csu") {
    return (
        <div className="add-credit-modal">
            <div className="add-credit-modal-header">
                <h2>
                    Add {credit_type === "pusd" ? "PUSD" : "UC/CSU"} Credit
                    Requirement
                </h2>
            </div>
            <div className="add-credit-modal-form">
                <p>To be implemented in a future update.</p>
            </div>
        </div>
    );
}
