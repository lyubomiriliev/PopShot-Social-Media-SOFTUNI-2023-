import "../../assets/styles/homePage.scss";

import LeftBar from "../navbar-components/LeftBar";
import NavBar from "../navbar-components/NavBar";
import RightBar from "../navbar-components/RightBar";
import FeedPosts from "../posts/FeedPosts";




export default function HomePage() {


    return (
        <div className="home">
            <NavBar />
            <div className="homeLayout">
                <div className="leftBarHome">
                    <LeftBar />
                </div>
                <div className="layoutHome">
                    <FeedPosts />
                </div>
                <div className="rightBarHome">
                    <RightBar />
                </div>
            </div>
        </div>
    );
}
