import "../../assets/styles/userSearch.scss"

import { Link } from "react-router-dom"
import useFollowUser from "../../hooks/useFollowUser";
import useAuthStore from "../../store/authStore";

const UserSearch = ({ user }) => {

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
        <div className="userWrapper">
            <Link to={`/${user.username}`} >
                <img src={user.profilePicURL} alt="" />
            </Link>
            <Link to={`/${user.username}`}>
                <p>{user.fullName}</p>
            </Link>
            <p>{user.followers.length} followers</p>
            {authUser.uid !== user.uid && (
                <button onClick={onFollowUser} >{isFollowing ? "Unfollow" : "Follow"}</button>
            )}
        </div>
    )
}

export default UserSearch
