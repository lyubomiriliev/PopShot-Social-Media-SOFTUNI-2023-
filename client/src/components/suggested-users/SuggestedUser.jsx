import "../../assets/styles/suggestedUser.scss";

import useFollowUser from "../../hooks/useFollowUser";
import useAuthStore from "../../store/authStore";

export default function SuggestedUser({ user, setUser }) {

    const { isFollowing, IsUpdating, handleFollowUser } = useFollowUser(user.uid)
    const authUser = useAuthStore((state) => state.user);

    const onFollowUser = async () => {
        await handleFollowUser();
        setUser({
            ...user,
            followers: isFollowing
                ? user.followers.filter((follower) => follower.uid !== authUser.uid)
                : [...user.followers, authUser],
        });

    }

    return (
        <>
            <div className="suggestedUserWrapper">
                <div className="profilePic">
                    <img src={user.profilePicURL} alt="" />
                </div>
                <div className="userInfo">
                    <p>{user.fullName}</p>
                    <p>{user.followers.length} followers</p>
                </div>
                <div className="actionBtn">
                    {authUser.uid !== user.uid && (
                        <button onClick={onFollowUser} >{isFollowing ? "Unfollow" : "Follow"}</button>
                    )}
                </div>
            </div>

        </>
    );
}