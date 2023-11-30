import LeftBar from "../navbar-components/LeftBar";
import NavBar from "../navbar-components/NavBar";
import RightBar from "../navbar-components/RightBar";
import Stories from "../stories/Stories";
import Posts from "../posts-page/Posts";

export default function HomePage() {
    return (
        <div>
            <NavBar />
            <div style={{ display: "flex" }}>
                <LeftBar />
                <div style={{ flex: 6 }}>
                    <Stories />
                    <Posts />
                </div>
                <RightBar />

            </div>
        </div>
    );
}
