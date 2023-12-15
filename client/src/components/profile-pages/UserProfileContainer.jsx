import "../../assets/styles/userProfileContainer.scss";

import useUserProfileStore from "../../store/userProfileStore";
import useAuthStore from "../../store/authStore";
import MyProfileEdit from "./MyProfileEdit";
import { useState } from "react";
import useFollowUser from "../../hooks/useFollowUser";

export default function UserProfileContainer() {

    const { userProfile } = useUserProfileStore();

    const { isFollowing, isUpdating, handleFollowUser } = useFollowUser(userProfile?.uid)

    const authUser = useAuthStore(state => state.user);

    const visitingOwnProfileAuth = authUser && authUser.username === userProfile.username;
    const visitingAnotherProfileAuth = authUser && authUser.username !== userProfile.username;

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div className="profile">
            <div className="images">
                <img src="https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" className="cover" />
                <img src={userProfile.profilePicURL} alt="" className="profilePic" />
            </div>
            <div className="profileContainer">
                <div className="uInfo">
                    <div className="left">
                        <div className="item">
                            <p>{userProfile.posts.length} posts</p>
                            <p>{userProfile.followers.length} followers</p>
                            <p>{userProfile.following.length} following</p>
                        </div>
                    </div>
                    <div className="center">
                        <span>{userProfile.fullName}</span>
                        <div className="info">
                            <p>{userProfile.bio}</p>
                        </div>
                    </div>
                    <div className="right">
                        {visitingOwnProfileAuth && <button onClick={handleOpen} >Edit Profile</button>}
                        {visitingAnotherProfileAuth && <button onClick={handleFollowUser} >{isFollowing ? "Unfollow" : "Follow"}</button>}
                        <MyProfileEdit open={open} handleClose={handleClose} />
                    </div>
                </div>
            </div>
        </div>
    );
}