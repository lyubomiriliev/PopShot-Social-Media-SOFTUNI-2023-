import "../../assets/styles/homePage.scss";

import LeftBar from "../navbar-components/LeftBar";
import NavBar from "../navbar-components/NavBar";
import RightBar from "../navbar-components/RightBar";
import Stories from "../stories/Stories";
import SubmitPost from "../posts/SubmitPost";




export default function HomePage() {


    return (
        <div className="home">
            <NavBar />
            <div style={{ display: "flex" }}>
                <LeftBar />
                <div style={{ flex: 6 }}>
                    <Stories />
                    <SubmitPost />
                </div>
                <RightBar />

            </div>
        </div>
    );
}
