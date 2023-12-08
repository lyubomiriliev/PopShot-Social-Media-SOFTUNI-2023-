import LeftBar from "../navbar-components/LeftBar";
import NavBar from "../navbar-components/NavBar";
import RightBar from "../navbar-components/RightBar";
import Profile from "./Profile";

export default function UserProfile() {
    return (
        <div>
            <NavBar />
            <div style={{ display: "flex" }}>
                <LeftBar />
                <Profile />
                <RightBar />
            </div>
        </div>
    );
}