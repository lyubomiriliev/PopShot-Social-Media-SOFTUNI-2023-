import { Link } from "react-router-dom";

export default function NavBar() {

    return (
        <div className="wrapper">
            <div>
                <img className="logo" src="./images/popshot-logo.png" alt="logo" />
            </div>
            <div className="links">
                <Link className="home" to="/">Home</Link>
                <Link to="/explore">Explore</Link>
                <Link to="/people">People</Link>
                <Link to="/saved">Saved</Link>
                <Link to="/create/post">Create Post</Link>
                <Link to="#">Log out</Link>
            </div>
        </div>
    );
}