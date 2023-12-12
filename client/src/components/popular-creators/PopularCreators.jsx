export default function PopularCreators() {
    return (
        <div className="item">
            <span>Popular Creators</span>

            <div className="user">
                <div className="userInfo">
                    <img src="https://img.freepik.com/premium-vector/female-user-profile-avatar-is-woman-character-screen-saver-with-emotions_505620-617.jpg" alt="profilePic" />
                    <span>Jane Doe</span>
                    <p>1.2M Followers</p>

                </div>
                <div className="buttons">
                    <button>Follow</button>
                    <button>Add to Friends</button>
                </div>
            </div>
        </div>
    );
}