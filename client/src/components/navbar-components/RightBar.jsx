import "../../assets/styles/rightBar.scss";
import SuggestedUsers from "../suggested-users/SuggestedUsers";

export default function RightBar() {
    return (
        <div className="rightBar">
            <div className="container">
                <div className="friendList">
                    <SuggestedUsers />
                </div>
                <div className="popularCreators">
                </div>
            </div>
        </div>
    );
}