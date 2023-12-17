import "../../assets/styles/rightBar.scss";

import SuggestedUsers from "../suggested-users/SuggestedUsers";



export default function RightBar() {
    return (
        <div className="rightBar">
            <div className="container">
                <div className="suggestedUsersList">
                    <SuggestedUsers />
                </div>
            </div>
        </div>
    );
}