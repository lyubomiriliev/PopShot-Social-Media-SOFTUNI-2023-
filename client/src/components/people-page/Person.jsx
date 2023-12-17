import { Link } from "react-router-dom";
import useFollowUser from "../../hooks/useFollowUser";
import useAuthStore from "../../store/authStore";
import LeftBar from "../navbar-components/LeftBar";
import NavBar from "../navbar-components/NavBar";

export default function Person({ user, setUser }) {

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
        <div className="mainSection">
            <div className="userImg">
                <Link style={{ textDecoration: "none", color: "inherit" }} to={`/${user.username}`} >
                    <img src={user.profilePicURL} alt="" />
                </Link>
            </div>
            <div className="userInfo">
                <Link style={{ textDecoration: "none", color: "inherit" }} to={`/${user.username}`}>
                    <p>{user.fullName}</p>
                </Link>
                <p>{user.followers.length} followers</p>
                <div className="actionBtns">
                    {authUser.uid !== user.uid && (
                        <button onClick={onFollowUser} >{isFollowing ? "Unfollow" : "Follow"}</button>
                    )}
                </div>
            </div>
        </div>
    );
}