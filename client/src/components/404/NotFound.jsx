import { Link } from "react-router-dom";
import "../../assets/styles/notFound.scss"
import Path from "../../paths";

export default function NotFound() {
    return (
        <div className="wrapper404">
            <Link to={Path.Home} style={{ textDecoration: "none", color: "inherit" }}>
                <button>Go back to home</button>
            </Link>
        </div>
    );
}