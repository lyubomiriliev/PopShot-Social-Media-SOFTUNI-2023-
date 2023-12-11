import "../../assets/styles/friendsList.scss";

export default function FriendsList() {
    return (
        <div className="item">
            <span>Your friends:</span>
            <div className="user">
                <div className="userInfo">
                    <img src="https://img.freepik.com/premium-vector/female-user-profile-avatar-is-woman-character-screen-saver-with-emotions_505620-617.jpg" alt="profilePic" />
                    <span>Jane Doe</span>
                </div>
                <div className="buttons">
                    <button>Unfriend</button>
                </div>
            </div>
            <div className="user">
                <div className="userInfo">
                    <img src="https://img.freepik.com/premium-vector/female-user-profile-avatar-is-woman-character-screen-saver-with-emotions_505620-617.jpg" alt="profilePic" />
                    <span>Jane Doe</span>
                </div>
                <div className="buttons">
                    <button>Unfriend</button>
                </div>
            </div>
        </div>
    );
}