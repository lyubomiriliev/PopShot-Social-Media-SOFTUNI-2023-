import "../../assets/styles/suggestedUser.scss";
import { Link } from "react-router-dom";

import useFollowUser from "../../hooks/useFollowUser";
import useAuthStore from "../../store/authStore";

export default function SuggestedUser({ user, setUser }) {

    const { isFollowing, handleFollowUser } = useFollowUser(user.uid)
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
                <div className="userInfo">
                    <div className="profilePic">
                        <Link to={`/${user.username}`} >
                            <img src={user.profilePicURL} alt="" />
                        </Link>
                        <div className="profileInfo">
                            <Link to={`/${user.username}`}>
                                <p>{user.fullName}</p>
                            </Link>
                            <p>{user.followers.length} followers</p>
                        </div>
                        <div className="actionBtn">
                            {authUser.uid !== user.uid && (
                                <button onClick={onFollowUser} >{isFollowing ? "Unfollow" : "Follow"}</button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}