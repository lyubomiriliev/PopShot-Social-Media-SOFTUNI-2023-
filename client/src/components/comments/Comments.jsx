import { useState } from "react";
import "../../assets/styles/comments.scss";

import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';

import useGetUserProfileById from "../../hooks/useGetUserProfileById";
import { Link } from "react-router-dom";




export default function Comments({ comment }) {

    const [isCommentLiked, setIsCommentLiked] = useState(false);

    const handleLikeComment = () => {
        setIsCommentLiked(!isCommentLiked);
    }

    const { userProfile } = useGetUserProfileById(comment.createdBy)

    if (!userProfile) return null;

    return (
        <div className="postInner">
            <div className="profileUser">
                <Link to={`/${userProfile.username}`} style={{ textDecoration: "none", color: "inherit" }}>
                    <h3>{userProfile.username}</h3>
                </Link>
                <div className="commentDesc">
                    <p>{comment.comment}</p>
                </div>
            </div>
            <div className="likeBtn">
                <button onClick={handleLikeComment} >{!isCommentLiked ? <FavoriteBorderOutlinedIcon /> : <FavoriteOutlinedIcon />}</button>
            </div>
        </div>

    );

}