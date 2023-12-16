import "../../assets/styles/comments.scss";

import useGetUserProfileById from "../../hooks/useGetUserProfileById";
import { Link } from "react-router-dom";
import { timeAgo } from "../../utils/timeAgo";




export default function Comments({ comment }) {

    const { userProfile } = useGetUserProfileById(comment.createdBy)

    if (!userProfile) return null;

    return (
        <div className="commentMap">
            <div className="postInner">
                <Link to={`/${userProfile.username}`}>
                    <img src={userProfile.profilePicURL} alt="" />
                </Link>
                <div className="userCommentInfo">
                    <Link to={`/${userProfile.username}`} style={{ textDecoration: "none", color: "inherit" }}>
                        <h3>{userProfile.username}</h3>
                    </Link>
                    <p>{timeAgo(comment.createdAt)}</p>
                </div>
                <div className="commentBody">
                    <p>{comment.comment}</p>
                </div>
            </div>
        </div>

    );

}