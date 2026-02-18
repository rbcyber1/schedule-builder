import "../styles/ClassList.css";

interface ClassListingProps {
    id: number;
    name: string;
    crf_id: string;
    credits: number;
    is_weighted: boolean;
}

export default function ClassListing({
    id,
    name,
    crf_id,
    credits,
    is_weighted,
}: ClassListingProps) {
    return (
        <div className="class-list-item">
            <span className="class-list-item-id">#{id}</span>
            <span className="class-list-item-crf">{crf_id}</span>
            <span className="class-list-item-name">{name}</span>
            {is_weighted && <span className="class-list-item-badge">W</span>}
            <span className="class-list-item-credits">{credits} cr</span>
            <div className="class-list-item-button">
                <button className="delete-button">X</button>
            </div>
        </div>
    );
}
