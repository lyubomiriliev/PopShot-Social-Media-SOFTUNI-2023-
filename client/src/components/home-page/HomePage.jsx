import LeftBar from "../navbar-components/LeftBar";
import Navbar from "../navbar-components/Navbar";
import RightBar from "../navbar-components/RightBar";
import Stories from "../stories/Stories";
import Posts from "../posts/Posts";

export default function HomePage() {
    return (
        <div>
            <Navbar />
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
