import "../../assets/styles/rightBar.scss";
import PopularCreators from "../popular-creators/PopularCreators";
import SuggestedUsers from "../suggested-users/SuggestedUsers";

export default function RightBar() {
    return (
        <div className="rightBar">
            <div className="container">
                <div className="friendList">
                    <SuggestedUsers />
                </div>
                <div className="popularCreators">
                    <PopularCreators />
                </div>
            </div>
        </div>
    );
}