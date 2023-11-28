import '../../assets/styles/rightBar.scss';


export default function RightBar() {
    return (
        <div className="rightBar">
            <div className="container">
                <div className="item">
                    <span>Suggested People:</span>
                    <div className="user">
                        <div className="userInfo">
                            <img src="https://img.freepik.com/premium-vector/female-user-profile-avatar-is-woman-character-screen-saver-with-emotions_505620-617.jpg" alt="profilePic" />
                            <span>Jane Doe</span>
                        </div>
                        <div className="buttons">
                            <button>Follow</button>
                            <button>Dismiss</button>
                        </div>
                    </div>
                    <div className="user">
                        <div className="userInfo">
                            <img src="https://img.freepik.com/premium-vector/female-user-profile-avatar-is-woman-character-screen-saver-with-emotions_505620-617.jpg" alt="profilePic" />
                            <span>Jane Doe</span>
                        </div>
                        <div className="buttons">
                            <button>Follow</button>
                            <button>Dismiss</button>
                        </div>
                    </div>
                </div>
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
                        </div>
                    </div>
                    <div className="user">
                        <div className="userInfo">
                            <img src="https://img.freepik.com/premium-vector/female-user-profile-avatar-is-woman-character-screen-saver-with-emotions_505620-617.jpg" alt="profilePic" />
                            <span>Jane Doe</span>
                            <p>765K Followers</p>

                        </div>
                        <div className="buttons">
                            <button>Follow</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}