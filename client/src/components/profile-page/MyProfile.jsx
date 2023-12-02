import "../../assets/styles/myProfile.scss";
import { auth } from '../../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth'
import Posts from "../posts-page/Posts";
import MyPosts from "./MyPosts";


export default function MyProfile() {

    const [user] = useAuthState(auth);

    return (
        <div className="profile">
            <div className="images">
                <img src="https://images.pexels.com/photos/2876511/pexels-photo-2876511.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" className="cover" />
                <img src={user?.photoURL ?? ""} alt="" className="profilePic" />
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
                        <span>{user?.displayName}</span>
                        <div className="info">
                            <p>About me: Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure, sit.</p>
                        </div>
                    </div>
                    <div className="right">
                        <button>Edit Profile</button>
                    </div>
                </div>
                <MyPosts />
            </div>
        </div>
    );
}