import "../../assets/styles/rightBar.scss";
import FriendsList from "../friends-list/FriendsList";
import PopularCreators from "../popular-creators/PopularCreators";

export default function RightBar() {
    return (
        <div className="rightBar">
            <div className="container">
                <div className="friendList">
                    <FriendsList />
                </div>
                <div className="popularCreators">
                    <PopularCreators />
                </div>
            </div>
        </div>
    );
}