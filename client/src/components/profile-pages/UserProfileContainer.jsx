import "../../assets/styles/userProfileContainer.scss";
import { useState } from "react";

import useUserProfileStore from "../../store/userProfileStore";
import useAuthStore from "../../store/authStore";
import MyProfileEdit from "./MyProfileEdit";
import useFollowUser from "../../hooks/useFollowUser";

import EditIcon from '@mui/icons-material/Edit';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';


export default function UserProfileContainer() {

    const { userProfile } = useUserProfileStore();

    const { isFollowing, handleFollowUser } = useFollowUser(userProfile?.uid)

    const authUser = useAuthStore(state => state.user);

    const visitingOwnProfileAuth = authUser && authUser.username === userProfile.username;
    const visitingAnotherProfileAuth = authUser && authUser.username !== userProfile.username;

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div className="profile">
            <div className="images">
                <img src="https://i.imgur.com/4L3gPTn.jpg" alt="" className="cover" />
                {visitingOwnProfileAuth && <EditIcon className="button" onClick={handleOpen} />}
                <img src={userProfile.profilePicURL} alt="" className="profilePic" />
            </div>
            <div className="profileContainer">
                <div className="uInfo">
                    <div className="center">
                        <span>{userProfile.fullName}</span>
                        <div className="info">
                            <p>Bio: {userProfile.bio}</p>
                        </div>
                        <div className="item">
                            <p>{userProfile.posts.length} posts</p>
                            <p>{userProfile.followers.length} followers</p>
                            <p>{userProfile.following.length} following</p>
                        </div>
                    </div>
                    <div className="right">
                        {visitingOwnProfileAuth && (
                            <span>
                                <EditIcon onClick={handleOpen} />
                            </span>
                        )}
                        {visitingAnotherProfileAuth && <button onClick={handleFollowUser} >{isFollowing ? "Unfollow" : "Follow"}</button>}
                        <MyProfileEdit open={open} handleClose={handleClose} />
                    </div>
                </div>
            </div>
        </div>
    );
}