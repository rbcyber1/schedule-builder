import "../styles/Links.css";

interface LinkContainerProps {
    title: string;
    link: string;
    image: string;
}

export default function LinkContainer({
    title,
    link,
    image,
}: LinkContainerProps) {
    return (
        <div className="link-container">
            <a href={link} target="_blank" rel="noopener noreferrer">
                <img src={image} alt={title} />
                <span>{title}</span>
            </a>
        </div>
    );
}
