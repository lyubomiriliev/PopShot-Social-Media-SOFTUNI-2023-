import { Link } from "react-router-dom";
import "../../assets/styles/singlePost.scss";
import useGetUserProfileById from "../../hooks/useGetUserProfileById";
import useFollowUser from "../../hooks/useFollowUser";
import { timeAgo } from "../../utils/timeAgo";
import useLikePost from "../../hooks/useLikePost";

import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';

import Comments from "../comments/Comments";
import usePostComment from "../../hooks/usePostComment";
import { useState } from "react";


export default function FeedPost({ post }) {

    const { userProfile } = useGetUserProfileById(post.createdBy)
    const { handleFollowUser, isFollowing } = useFollowUser(post.createdBy)
    const { handleLikePost, isLiked, likes } = useLikePost(post)
    const { handlePostComment } = usePostComment()


    const [comment, setComment] = useState('');

    const handleSubmitComment = async () => {
        await handlePostComment(post.id, comment)
        setComment("")
    }


    return (
        <>
            <div className="single-post">
                <div className="postContainer">
                    <div className="userPostInfo">
                        <Link to={`/${userProfile?.username}`} style={{ textDecoration: "none", color: "inherit" }}>
                            <img src={userProfile?.profilePicURL} alt="profilePic" className="postThumbnail" />
                        </Link>
                        <div className="details">
                            <Link to={`/${userProfile?.username}`} style={{ textDecoration: "none", color: "inherit" }}>
                                <span className="name">{userProfile?.username}</span>
                            </Link>
                        </div>

                        <button onClick={handleFollowUser} >{isFollowing ? "Unfollow" : "Follow"}</button>
                    </div>
                    <div className="datePosted">
                        <span className="date">{timeAgo(post.createdAt)}</span>
                    </div>
                    <div className="title">
                        <h2>{post.title}</h2>
                    </div>
                    <div className="content">
                        <p>{post.content}</p>
                    </div>
                    <div className="image">
                        <img src={post.imageURL} alt="" />
                    </div>

                    <div className="info">
                        <div className="actionBtn">
                            <button onClick={handleLikePost}>{!isLiked ? <FavoriteBorderOutlinedIcon /> : <FavoriteOutlinedIcon />}</button>
                            <p>{likes} likes</p>

                        </div>
                        <div className="actionBtn">
                            <input type="text" placeholder="Add a comment..." value={comment} onChange={(e) => setComment(e.target.value)} />
                            <button onClick={handleSubmitComment} ><SendOutlinedIcon /></button>
                        </div>
                    </div>

                </div>
            </div>
            <div className="commentsDiv">
                {post.comments.map(comment => (
                    <Comments key={comment.id} comment={comment} />
                ))}
            </div>
        </>
    );
}