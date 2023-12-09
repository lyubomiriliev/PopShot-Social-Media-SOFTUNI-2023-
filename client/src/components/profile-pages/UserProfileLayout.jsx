import LeftBar from "../navbar-components/LeftBar";
import NavBar from "../navbar-components/NavBar";
import RightBar from "../navbar-components/RightBar";
import UserProfileContainer from "./UserProfileContainer";

export default function UserProfileLayout() {
    return (
        <div>
            <NavBar />
            <div style={{ display: "flex" }}>
                <LeftBar />
                <UserProfileContainer />
                <RightBar />
            </div>
        </div>
    );
}