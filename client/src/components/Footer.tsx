function getYear() {
    return new Date().getFullYear();
}

export default function Footer() {
    return (
        <footer>
            <div className="copyright">
                <p>
                    &copy; {getYear()} Rancho Bernardo Cybersecurity Club;
                    Non-commercial uses permitted.
                </p>
            </div>
        </footer>
    );
}
