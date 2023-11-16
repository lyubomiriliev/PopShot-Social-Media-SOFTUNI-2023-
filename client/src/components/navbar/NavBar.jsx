import { Link } from "react-router-dom";

export default function NavBar () {

    return(
        <div className="navigation">
            <div className="nav-bar">
            <img src="#" alt="logo" />
            <Link to="/">Home</Link>
            <Link to="/explore">Explore</Link>
            <Link to="/people">People</Link>
            <Link to="/saved">Saved</Link>
            <Link to="/create/post">Create Post</Link>
            <Link to="#">Log out</Link>
            </div>
        </div>
    );
}