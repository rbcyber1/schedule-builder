import LinkContainer from "../components/LinkContainer";

import "../styles/Links.css";

const placeholderLinks = [
    {
        title: "Khan Academy",
        link: "https://www.khanacademy.org",
        image: "https://picsum.photos/seed/khan/400/225",
    },
    {
        title: "Desmos",
        link: "https://www.desmos.com",
        image: "https://picsum.photos/seed/desmos/400/225",
    },
    {
        title: "College Board",
        link: "https://www.collegeboard.org",
        image: "https://picsum.photos/seed/collegeboard/400/225",
    },
    {
        title: "Common App",
        link: "https://www.commonapp.org",
        image: "https://picsum.photos/seed/commonapp/400/225",
    },
    {
        title: "UC Application",
        link: "https://apply.universityofcalifornia.edu",
        image: "https://picsum.photos/seed/ucapp/400/225",
    },
    {
        title: "CSU Apply",
        link: "https://www.calstate.edu/apply",
        image: "https://picsum.photos/seed/csuapply/400/225",
    },
];

export default function Links() {
    return (
        <div className="links-container">
            <div className="links-header">
                <h1>Useful Links</h1>
            </div>
            <div className="links-list">
                {placeholderLinks.map((item) => (
                    <LinkContainer
                        key={item.link}
                        title={item.title}
                        link={item.link}
                        image={item.image}
                    />
                ))}
            </div>
        </div>
    );
}
