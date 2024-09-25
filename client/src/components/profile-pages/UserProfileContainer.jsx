import "../../assets/styles/userProfileContainer.scss";
import { useState } from "react";

import useUserProfileStore from "../../store/userProfileStore";
import useAuthStore from "../../store/authStore";
import MyProfileEdit from "./MyProfileEdit";
import useFollowUser from "../../hooks/useFollowUser";

import EditIcon from '@mui/icons-material/Edit';
import EditCoverImage from "./EditCoverImage";


export default function UserProfileContainer() {

    const { userProfile } = useUserProfileStore();
    const { isFollowing, handleFollowUser } = useFollowUser(userProfile?.uid)

    const authUser = useAuthStore(state => state.user);

    const visitingOwnProfileAuth = authUser && authUser.username === userProfile.username;
    const visitingAnotherProfileAuth = authUser && authUser.username !== userProfile.username;

    const [open, setOpen] = useState(false);
    const [coverOpen, setCoverOpen] = useState(false);
    const [coverImage, setCoverImage] = useState("https://i.imgur.com/4L3gPTn.jpg");

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleCoverOpen = () => setCoverOpen(true)
    const handleCoverClose = () => setCoverOpen(false);

    const handleCoverImageChange = (newCoverImage) => {
        setCoverImage(newCoverImage);
        handleCoverClose();
    }

    return (
        <div className="profile">
            <div className="images">
                <img src={coverImage} alt="" className="cover" />
                {visitingOwnProfileAuth && <EditIcon className="button" onClick={handleCoverOpen} />}
                <img src={userProfile.profilePicURL} alt="" className="profilePic" />
                {visitingAnotherProfileAuth && <button className="followBtn" onClick={handleFollowUser} >{isFollowing ? "Unfollow" : "Follow"}</button>}

            </div>
            <div className="profileContainer">
                <div className="uInfo">
                    <div className="center">
                        <div className="editProfile">
                            <span>{userProfile.fullName}</span>
                            {visitingOwnProfileAuth && (
                                <span>
                                    <EditIcon onClick={handleOpen} />
                                </span>
                            )}
                        </div>
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
                        <MyProfileEdit open={open} handleClose={handleClose} coverOpen={coverOpen} handleCoverClose={handleCoverClose} />
                        <EditCoverImage open={coverOpen} handleClose={handleCoverClose} onCoverImageChange={handleCoverImageChange} />
                    </div>
                </div>
            </div>
        </div>
    );
}