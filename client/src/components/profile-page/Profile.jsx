import "../../assets/styles/profile.scss";
import Posts from "../posts-page/Posts";

export default function Profile() {
    return (
        <div className="profile">
            <div className="images">
                <img src="https://images.pexels.com/photos/2876511/pexels-photo-2876511.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" className="cover" />
                <img src="https://images.pexels.com/photos/3778876/pexels-photo-3778876.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" className="profilePic" />
            </div>
            <div className="profileContainer">
                <div className="uInfo">
                    <div className="left">
                        <div className="item">
                            <p>25 Posts</p>
                            <p>468 Followers</p>
                            <p>166 Following</p>
                        </div>
                    </div>
                    <div className="center">
                        <span>John Doe</span>
                        <div className="info">
                            <p>About me: Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure, sit.</p>
                        </div>
                    </div>
                    <div className="right">
                        <button>Follow</button>
                    </div>
                </div>
                <Posts />
            </div>
        </div>
    );
}